// SPDX-License-Identifier: MIT

//   ____       ____       ____        _____       ____
// /\  _`\    /\  _`\    /\  _`\     /\  __`\    /\  _`\
// \ \ \/\ \  \ \ \L\ \  \ \ \L\ \   \ \ \/\ \   \ \,\L\_\
//  \ \ \ \ \  \ \  _ <'  \ \ ,  /    \ \ \ \ \   \/_\__ \
//   \ \ \_\ \  \ \ \L\ \  \ \ \\ \    \ \ \_\ \    /\ \L\ \
//    \ \____/   \ \____/   \ \_\ \_\   \ \_____\   \ `\____\
//     \/___/     \/___/     \/_/\/ /    \/_____/    \/_____/
// 01000100 01000010 01010010 01001111 01010011
// Built by: Decentral Bro's: https://www.decentralbros.io

pragma solidity ^0.8.20;

// Imports
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

// Minimal interface for the BSTR vault used by this mint contract
interface IBSTRVault {
    function token() external view returns (address);
    function isMinter(address who) external view returns (bool);
    function distribute(address to, uint256 amount) external;
}

/**
 * @title DRVNSteel (TOKEN_ID = 0)
 * @notice ERC1155 single-ID collection with USDC paid mint, optional BSTR rewards (vault / wallet / contract-held),
 *         royalties (ERC2981), pause, airdrop, metadata freeze, and frontend helpers.
 */
contract DRVNSteel is ERC1155, ERC1155Supply, ERC1155Burnable, ERC2981, Ownable, Pausable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    // ——— Token ID (fixed) ———
    uint256 public constant TOKEN_ID = 0;

    // ——— Collection metadata (UX helpers; ERC1155 has no standard name/symbol) ———
    string public name;
    string public symbol;

    // ——— Mint config ———
    uint256 public immutable MAX_SUPPLY; // cap for ID 0
    uint256 public mintPrice; // USDC price per unit (USDC typically 6 decimals)
    bool public saleActive; // public sale switch

    address public fundsReceiver; // USDC proceeds receiver
    IERC20 public immutable USDC; // payment token

    // ——— BSTR reward config ———
    IERC20 public BSTR; // reward token (expects 9 decimals)
    address public rewardVault; // 0 => contract-push; non-0 => vault/wallet address
    bool public rewardVaultIsContract; // true => call IBSTRVault.distribute
    uint256 public rewardPerUnit; // BSTR per NFT unit (smallest units)
    bool public rewardEnabled; // master switch
    bool public rewardOnAirdrop; // also reward airdrops/ownerMint
    bool public rewardRevertIfInsufficient; // if true, revert when insufficient BSTR

    // ——— URIs ———
    string private _baseURI; // e.g. ipfs://CID/
    string private _contractURI; // collection-level metadata (OpenSea)
    bool public metadataFrozen; // freeze flag for URIs

    // ——— Events ———
    event SaleStateSet(bool active);
    event MintPriceSet(uint256 price);
    event FundsReceiverSet(address indexed receiver);
    event BaseURISet(string uri);
    event ContractURISet(string uri);
    event MetadataFrozen();

    event BSTRSet(address indexed token);
    event RewardPerUnitSet(uint256 amount);
    event RewardVaultSet(address indexed vault, bool isContract);
    event RewardFlagsSet(bool enabled, bool onAirdrop, bool strict);
    event RewardSent(address indexed to, uint256 amount);
    event RewardSkipped(address indexed to, uint256 required, uint256 available);

    constructor(
        string memory _name,
        string memory _symbol,
        string memory baseURI_,
        string memory contractURI_,
        address initialOwner,
        address usdc_,
        address _fundsReceiver,
        uint96 defaultRoyaltyBps, // e.g. 500 = 5.00%
        uint256 maxSupply_,
        uint256 mintPrice_
    ) ERC1155("") {
        require(initialOwner != address(0), "Owner=0");
        require(usdc_ != address(0), "USDC=0");
        require(_fundsReceiver != address(0), "Receiver=0");
        require(maxSupply_ > 0, "maxSupply=0");

        name = _name;
        symbol = _symbol;
        _baseURI = baseURI_;
        _contractURI = contractURI_;
        USDC = IERC20(usdc_);
        fundsReceiver = _fundsReceiver;
        MAX_SUPPLY = maxSupply_;
        mintPrice = mintPrice_;

        _transferOwnership(initialOwner);
        _setDefaultRoyalty(_fundsReceiver, defaultRoyaltyBps);
    }

    // ——— Modifiers ———
    modifier onlyEOA() {
        require(msg.sender == tx.origin, "No contracts");
        _;
    }

    // ——— Admin ———
    function setSaleActive(bool active) external onlyOwner nonReentrant {
        saleActive = active;
        emit SaleStateSet(active);
    }
    function pause() external onlyOwner nonReentrant {
        _pause();
    }
    function unpause() external onlyOwner nonReentrant {
        _unpause();
    }

    function setMintPrice(uint256 price) external onlyOwner nonReentrant {
        mintPrice = price;
        emit MintPriceSet(price);
    }
    function setFundsReceiver(address receiver) external onlyOwner nonReentrant {
        require(receiver != address(0), "Receiver=0");
        fundsReceiver = receiver;
        emit FundsReceiverSet(receiver);
    }

    function setDefaultRoyalty(address receiver, uint96 feeNumerator) external onlyOwner nonReentrant {
        _setDefaultRoyalty(receiver, feeNumerator);
    }
    function deleteDefaultRoyalty() external onlyOwner nonReentrant {
        _deleteDefaultRoyalty();
    }

    function setBaseURI(string calldata newBase) external onlyOwner nonReentrant {
        require(!metadataFrozen, "Frozen");
        _baseURI = newBase;
        emit BaseURISet(newBase);
    }
    function setContractURI(string calldata newContractURI) external onlyOwner nonReentrant {
        require(!metadataFrozen, "Frozen");
        _contractURI = newContractURI;
        emit ContractURISet(newContractURI);
    }
    function freezeMetadata() external onlyOwner nonReentrant {
        metadataFrozen = true;
        emit MetadataFrozen();
    }

    // ——— BSTR setup ———
    function setBSTR(address token) external onlyOwner nonReentrant {
        require(token != address(0), "BSTR=0");
        // Validate 9 decimals if the token supports IERC20Metadata
        try IERC20Metadata(token).decimals() returns (uint8 dec) {
            require(dec == 9, "BSTR decimals!=9");
        } catch {}
        BSTR = IERC20(token);
        emit BSTRSet(token);
    }

    function setRewardPerUnit(uint256 amount) external onlyOwner nonReentrant {
        require(amount % 1e9 == 0, "not multiple of 1e9"); // enforce whole BSTR units
        rewardPerUnit = amount;
        emit RewardPerUnitSet(amount);
    }

    function setRewardVault(address vault, bool isContractVault) external onlyOwner nonReentrant {
        rewardVault = vault;
        rewardVaultIsContract = isContractVault;
        if (isContractVault && vault != address(0)) {
            // Sanity checks so the wrong vault can't be linked
            require(IBSTRVault(vault).token() == address(BSTR), "vault token mismatch");
            require(IBSTRVault(vault).isMinter(address(this)), "vault not authorizing this minter");
        }
        emit RewardVaultSet(vault, isContractVault);
    }

    function setRewardFlags(bool enabled, bool onAirdrop, bool strict) external onlyOwner nonReentrant {
        rewardEnabled = enabled;
        rewardOnAirdrop = onAirdrop;
        rewardRevertIfInsufficient = strict;
        emit RewardFlagsSet(enabled, onAirdrop, strict);
    }

    // ——— Public mint (USDC) ———
    function mint(uint256 amount) external nonReentrant whenNotPaused onlyEOA {
        require(saleActive, "Sale off");
        require(amount > 0, "Amount=0");
        require(totalSupply(TOKEN_ID) + amount <= MAX_SUPPLY, "Exceeds cap");

        uint256 cost = mintPrice * amount;
        USDC.safeTransferFrom(msg.sender, fundsReceiver, cost); // user must approve beforehand

        _mint(msg.sender, TOKEN_ID, amount, "");

        if (rewardEnabled && rewardPerUnit > 0) {
            _sendReward(msg.sender, rewardPerUnit * amount);
        }
    }

    // ——— Owner distributions ———
    function airdrop(address[] calldata recipients, uint256[] calldata amounts) external onlyOwner nonReentrant {
        require(recipients.length == amounts.length, "Len mismatch");
        uint256 total;
        for (uint256 i = 0; i < amounts.length; i++) total += amounts[i];
        require(total > 0, "No tokens");
        require(totalSupply(TOKEN_ID) + total <= MAX_SUPPLY, "Exceeds cap");

        for (uint256 i = 0; i < recipients.length; i++) {
            _mint(recipients[i], TOKEN_ID, amounts[i], "");
            if (rewardEnabled && rewardOnAirdrop && rewardPerUnit > 0) {
                _sendReward(recipients[i], rewardPerUnit * amounts[i]);
            }
        }
    }

    function ownerMint(address to, uint256 amount) external onlyOwner nonReentrant {
        require(amount > 0, "Amount=0");
        require(totalSupply(TOKEN_ID) + amount <= MAX_SUPPLY, "Exceeds cap");
        _mint(to, TOKEN_ID, amount, "");
        if (rewardEnabled && rewardOnAirdrop && rewardPerUnit > 0) {
            _sendReward(to, rewardPerUnit * amount);
        }
    }

    // ——— Reward helpers ———
    function _availableBSTR() internal view returns (uint256) {
        if (address(BSTR) == address(0)) return 0;
        if (rewardVault == address(0)) {
            // Contract-push mode
            return BSTR.balanceOf(address(this));
        } else if (rewardVaultIsContract) {
            // Vault contract (no allowance needed)
            return BSTR.balanceOf(rewardVault);
        } else {
            // Wallet + allowance mode
            uint256 bal = BSTR.balanceOf(rewardVault);
            uint256 alw = BSTR.allowance(rewardVault, address(this));
            return bal < alw ? bal : alw;
        }
    }

    function _sendReward(address to, uint256 amount) internal {
        require(address(BSTR) != address(0), "BSTR unset");
        uint256 available = _availableBSTR();
        if (available < amount) {
            if (rewardRevertIfInsufficient) revert("Insufficient BSTR");
            emit RewardSkipped(to, amount, available);
            return; // best-effort: skip
        }
        if (rewardVault == address(0)) {
            BSTR.safeTransfer(to, amount);
        } else if (rewardVaultIsContract) {
            IBSTRVault(rewardVault).distribute(to, amount);
        } else {
            BSTR.safeTransferFrom(rewardVault, to, amount);
        }
        emit RewardSent(to, amount);
    }

    // ——— Rescue ———
    function rescueETH() external onlyOwner nonReentrant {
        uint256 bal = address(this).balance;
        if (bal > 0) payable(fundsReceiver).transfer(bal);
    }

    function rescueERC20(address token, uint256 amount) external onlyOwner nonReentrant {
        IERC20(token).safeTransfer(fundsReceiver, amount);
    }

    // ——— Views / Frontend helpers ———
    function uri(uint256 id) public view override returns (string memory) {
        require(id == TOKEN_ID, "Bad tokenId");
        return string(abi.encodePacked(_baseURI, Strings.toString(TOKEN_ID), ".json"));
    }

    function contractURI() external view returns (string memory) {
        return _contractURI;
    }
    function totalMinted() external view returns (uint256) {
        return totalSupply(TOKEN_ID);
    }
    function maxSupply() external view returns (uint256) {
        return MAX_SUPPLY;
    }

    function rewardConfig()
        external
        view
        returns (
            address bstr,
            address vault,
            bool isContract,
            uint256 perUnit,
            bool enabled,
            bool onAirdrop,
            bool strict
        )
    {
        return (
            address(BSTR),
            rewardVault,
            rewardVaultIsContract,
            rewardPerUnit,
            rewardEnabled,
            rewardOnAirdrop,
            rewardRevertIfInsufficient
        );
    }

    function airdropFlag() external view returns (bool) {
        return rewardEnabled && rewardPerUnit > 0;
    }

    function rewardCapacity() public view returns (uint256 units) {
        if (!rewardEnabled || rewardPerUnit == 0 || address(BSTR) == address(0)) return 0;
        return _availableBSTR() / rewardPerUnit; // floors to full units only
    }

    function rewardStatusForMint(
        uint256 units
    )
        external
        view
        returns (
            bool active,
            uint256 perUnit,
            uint256 totalRewards,
            bool viaVault,
            address vault,
            uint256 availableUnits
        )
    {
        active = rewardEnabled && rewardPerUnit > 0 && address(BSTR) != address(0);
        perUnit = rewardPerUnit;
        totalRewards = rewardPerUnit * units;
        viaVault = rewardVault != address(0);
        vault = rewardVault;
        availableUnits = rewardPerUnit == 0 ? 0 : (_availableBSTR() / rewardPerUnit);
    }

    function balanceOfKey(address account) external view returns (uint256) {
        return balanceOf(account, TOKEN_ID);
    }

    // ——— Required overrides ———
    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155, ERC1155Supply) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC1155, ERC2981) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
