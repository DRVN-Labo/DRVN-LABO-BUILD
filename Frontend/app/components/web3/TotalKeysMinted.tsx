"use client";

import { useState, useEffect } from "react";
import { useReadContract } from "wagmi";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Trophy } from "lucide-react";
import deployedContracts from "../../../contracts/deployedContracts";

interface ContractData {
  name: string;
  address: string;
  totalMinted: bigint | undefined;
  maxSupply: bigint | undefined;
  isLoading: boolean;
  error: string | null;
}

export default function TotalKeysMinted() {
  const [contractsData, setContractsData] = useState<ContractData[]>([
    {
      name: "Steel Key",
      address: "0x0Efc7EFbbeB794517D62aaD40143f46CF6653f28",
      totalMinted: undefined,
      maxSupply: undefined,
      isLoading: true,
      error: null,
    },
    {
      name: "Carbon Key",
      address: "0x56E75E06F2213A20F35d92E57a958210610F0Aa8",
      totalMinted: undefined,
      maxSupply: undefined,
      isLoading: true,
      error: null,
    },
    {
      name: "Titanium Key",
      address: "0x958468063cA58C641e7b98FC4c7EE6fBd3238145",
      totalMinted: undefined,
      maxSupply: undefined,
      isLoading: true,
      error: null,
    },
  ]);

  // Read totalSupply from each contract
  const steelTotalSupply = useReadContract({
    address: "0x0Efc7EFbbeB794517D62aaD40143f46CF6653f28" as `0x${string}`,
    abi: deployedContracts[8453].SteelBuster.abi,
    functionName: "totalMinted",
  });

  const carbonTotalSupply = useReadContract({
    address: "0x56E75E06F2213A20F35d92E57a958210610F0Aa8" as `0x${string}`,
    abi: deployedContracts[8453].CarbonBuster.abi,
    functionName: "totalMinted",
  });

  const titaniumTotalSupply = useReadContract({
    address: "0x958468063cA58C641e7b98FC4c7EE6fBd3238145" as `0x${string}`,
    abi: deployedContracts[8453].TitaniumBuster.abi,
    functionName: "totalMinted",
  });

  // Read maxSupply from each contract
  const steelMaxSupply = useReadContract({
    address: "0x0Efc7EFbbeB794517D62aaD40143f46CF6653f28" as `0x${string}`,
    abi: deployedContracts[8453].SteelBuster.abi,
    functionName: "maxSupply",
  });

  const carbonMaxSupply = useReadContract({
    address: "0x56E75E06F2213A20F35d92E57a958210610F0Aa8" as `0x${string}`,
    abi: deployedContracts[8453].CarbonBuster.abi,
    functionName: "maxSupply",
  });

  const titaniumMaxSupply = useReadContract({
    address: "0x958468063cA58C641e7b98FC4c7EE6fBd3238145" as `0x${string}`,
    abi: deployedContracts[8453].TitaniumBuster.abi,
    functionName: "maxSupply",
  });

  // Update contracts data when contract reads complete
  useEffect(() => {
    setContractsData([
      {
        name: "Steel Key",
        address: "0x0Efc7EFbbeB794517D62aaD40143f46CF6653f28",
        totalMinted: steelTotalSupply.data as bigint | undefined,
        maxSupply: steelMaxSupply.data as bigint | undefined,
        isLoading: steelTotalSupply.isLoading || steelMaxSupply.isLoading,
        error:
          steelTotalSupply.error?.message ||
          steelMaxSupply.error?.message ||
          null,
      },
      {
        name: "Carbon Key",
        address: "0x56E75E06F2213A20F35d92E57a958210610F0Aa8",
        totalMinted: carbonTotalSupply.data as bigint | undefined,
        maxSupply: carbonMaxSupply.data as bigint | undefined,
        isLoading: carbonTotalSupply.isLoading || carbonMaxSupply.isLoading,
        error:
          carbonTotalSupply.error?.message ||
          carbonMaxSupply.error?.message ||
          null,
      },
      {
        name: "Titanium Key",
        address: "0x958468063cA58C641e7b98FC4c7EE6fBd3238145",
        totalMinted: titaniumTotalSupply.data as bigint | undefined,
        maxSupply: titaniumMaxSupply.data as bigint | undefined,
        isLoading: titaniumTotalSupply.isLoading || titaniumMaxSupply.isLoading,
        error:
          titaniumTotalSupply.error?.message ||
          titaniumMaxSupply.error?.message ||
          null,
      },
    ]);
  }, [
    steelTotalSupply.data,
    steelTotalSupply.isLoading,
    steelTotalSupply.error,
    steelMaxSupply.data,
    steelMaxSupply.isLoading,
    steelMaxSupply.error,
    carbonTotalSupply.data,
    carbonTotalSupply.isLoading,
    carbonTotalSupply.error,
    carbonMaxSupply.data,
    carbonMaxSupply.isLoading,
    carbonMaxSupply.error,
    titaniumTotalSupply.data,
    titaniumTotalSupply.isLoading,
    titaniumTotalSupply.error,
    titaniumMaxSupply.data,
    titaniumMaxSupply.isLoading,
    titaniumMaxSupply.error,
  ]);

  // Calculate totals
  const totalMinted = contractsData.reduce((sum, contract) => {
    return sum + (contract.totalMinted ? Number(contract.totalMinted) : 0);
  }, 0);

  const totalMaxSupply = contractsData.reduce((sum, contract) => {
    return sum + (contract.maxSupply ? Number(contract.maxSupply) : 0);
  }, 0);

  const totalPercentage =
    totalMaxSupply > 0 ? (totalMinted / totalMaxSupply) * 100 : 0;

  // Check if any contracts are still loading
  const isLoading = contractsData.some((contract) => contract.isLoading);

  return (
    <div className="space-y-3">
      {/* Compact Stats Table */}
      <Card className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 max-w-6xl mx-auto">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-white text-sm">
            <Trophy className="w-4 h-4 text-[#00daa2]" />
            Live Founder Key Specs
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          {/* Summary Row */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="bg-gray-800/30 rounded-md p-2 text-center">
              <div className="text-xs text-gray-400 mb-1">Total Minted</div>
              <div className="text-lg font-bold text-[#00daa2]">
                {isLoading ? "..." : totalMinted.toLocaleString()}
              </div>
            </div>
            <div className="bg-gray-800/30 rounded-md p-2 text-center">
              <div className="text-xs text-gray-400 mb-1">Max Supply</div>
              <div className="text-lg font-bold text-white">
                {isLoading ? "..." : totalMaxSupply.toLocaleString()}
              </div>
            </div>
            <div className="bg-gray-800/30 rounded-md p-2 text-center">
              <div className="text-xs text-gray-400 mb-1">Progress</div>
              <div className="text-lg font-bold text-white">
                {isLoading ? "..." : `${totalPercentage.toFixed(1)}%`}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-3">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Overall Progress</span>
              <span>
                {totalMinted.toLocaleString()} /{" "}
                {totalMaxSupply.toLocaleString()}
              </span>
            </div>
            <div className="w-full relative">
              <div
                className="w-full bg-gray-700 rounded-full h-1.5"
                style={{ position: "relative", overflow: "hidden" }}
              >
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#00daa2] to-green-400 rounded-full transition-all duration-500"
                  style={{ width: `${totalPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Contract Details Table */}
          <div className="overflow-hidden rounded-md border border-gray-600">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-800/50 border-b border-gray-600">
                  <th className="text-left p-2 text-gray-300 font-medium">
                    Contract
                  </th>
                  <th className="text-center p-2 text-gray-300 font-medium">
                    Minted
                  </th>
                  <th className="text-center p-2 text-gray-300 font-medium">
                    Max
                  </th>
                  <th className="text-center p-2 text-gray-300 font-medium">
                    Progress
                  </th>
                </tr>
              </thead>
              <tbody>
                {contractsData.map((contract, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-700/50 last:border-b-0 hover:bg-gray-800/30 transition-colors"
                  >
                    <td className="p-2 text-white font-medium">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            index === 0
                              ? "bg-blue-400"
                              : index === 1
                                ? "bg-green-400"
                                : "bg-purple-400"
                          }`}
                        />
                        {contract.name}
                      </div>
                    </td>
                    <td className="p-2 text-center">
                      {contract.isLoading ? (
                        <div className="text-gray-400">...</div>
                      ) : contract.error ? (
                        <div className="text-red-400 text-xs">Error</div>
                      ) : (
                        <span className="text-[#00daa2] font-semibold">
                          {contract.totalMinted?.toString() || "0"}
                        </span>
                      )}
                    </td>
                    <td className="p-2 text-center text-gray-300">
                      {contract.isLoading
                        ? "..."
                        : contract.maxSupply?.toString() || "0"}
                    </td>
                    <td className="p-2 text-center">
                      {contract.isLoading ? (
                        <div className="text-gray-400">...</div>
                      ) : contract.error ? (
                        <div className="text-red-400 text-xs">-</div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <div className="flex-1 relative">
                            <div
                              className="w-full bg-gray-700 rounded-full h-1.5"
                              style={{
                                position: "relative",
                                overflow: "hidden",
                              }}
                            >
                              <div
                                className="absolute top-0 left-0 h-full bg-[#00daa2] rounded-full transition-all duration-500"
                                style={{
                                  width:
                                    contract.maxSupply && contract.totalMinted
                                      ? `${(Number(contract.totalMinted) / Number(contract.maxSupply)) * 100}%`
                                      : "0%",
                                }}
                              />
                            </div>
                          </div>
                          <span className="text-gray-400 text-xs min-w-[2rem]">
                            {contract.maxSupply && contract.totalMinted
                              ? `${((Number(contract.totalMinted) / Number(contract.maxSupply)) * 100).toFixed(1)}%`
                              : "0%"}
                          </span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
