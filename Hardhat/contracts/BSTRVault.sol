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

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/// @title BSTRVault
/// @notice Holds **only BSTR** reward tokens and serves multiple mint contracts.
///         - Authorized minters call `distribute(to, amount)` while the vault is **not paused**.
///         - Owner can pause/unpause; withdraw BSTR & sweep ETH **only when paused**.
///         - Foreign ERC20 (non-BSTR) can be rescued at any time.
contract BSTRVault is Ownable, Pausable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    IERC20 public immutable BSTR; // reward token (expects 9 decimals on the token itself)
    mapping(address => bool) public isMinter; // allowlist of mint contracts (Steel/Carbon/Titanium)

    event MinterUpdated(address indexed minter, bool authorized);
    event Distributed(address indexed to, uint256 amount);
    event WithdrawBSTR(address indexed to, uint256 amount);
    event RescueForeign(address indexed token, address indexed to, uint256 amount);
    event RescueETH(address indexed to, uint256 amount);

    /// @param _owner     Contract owner.
    /// @param bstr       BSTR ERC20 token address.
    /// @param minters    Initial list of authorized mint contracts (can be empty).
    constructor(address _owner, address bstr, address[] memory minters) {
        require(_owner != address(0) && bstr != address(0), "zero addr");
        _transferOwnership(_owner);
        BSTR = IERC20(bstr);
        for (uint256 i = 0; i < minters.length; i++) {
            require(minters[i] != address(0), "zero minter");
            isMinter[minters[i]] = true;
            emit MinterUpdated(minters[i], true);
        }
    }

    // ——— Views ———
    /// @dev For interface-compat with the minter side (IBSTRVault).
    function token() external view returns (address) {
        return address(BSTR);
    }

    // ——— Admin ———
    function pause() external onlyOwner nonReentrant {
        _pause();
    }
    function unpause() external onlyOwner nonReentrant {
        _unpause();
    }

    /// @notice Add/remove a minter contract.
    function setMinter(address minter, bool authorized) external onlyOwner nonReentrant {
        require(minter != address(0), "zero");
        isMinter[minter] = authorized;
        emit MinterUpdated(minter, authorized);
    }

    // ——— Rewards ———
    /// @notice Called by authorized mint contracts to deliver BSTR to a recipient.
    function distribute(address to, uint256 amount) external whenNotPaused nonReentrant {
        require(isMinter[msg.sender], "not minter");
        require(to != address(0) && amount > 0, "bad params");
        BSTR.safeTransfer(to, amount);
        emit Distributed(to, amount);
    }

    // ——— Owner Withdrawals / Rescue ———
    /// @notice Withdraw **BSTR** (only when paused).
    function withdrawBSTR(address to, uint256 amount) external onlyOwner whenPaused nonReentrant {
        require(to != address(0), "zero to");
        BSTR.safeTransfer(to, amount);
        emit WithdrawBSTR(to, amount);
    }

    /// @notice Rescue any **non-BSTR** ERC20 accidentally sent here (allowed anytime).
    function rescueForeignERC20(address tokenAddress, address to, uint256 amount) external onlyOwner nonReentrant {
        require(tokenAddress != address(BSTR), "BSTR via withdrawBSTR");
        require(to != address(0), "zero to");
        IERC20(tokenAddress).safeTransfer(to, amount);
        emit RescueForeign(tokenAddress, to, amount);
    }

    /// @notice Receive ETH; sweep only when paused.
    receive() external payable {}

    function sweepETH(address payable to, uint256 amount) external onlyOwner whenPaused nonReentrant {
        require(to != address(0), "zero to");
        (bool ok, ) = to.call{value: amount}("");
        require(ok, "eth xfer");
        emit RescueETH(to, amount);
    }
}
