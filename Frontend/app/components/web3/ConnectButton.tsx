"use client";

import { ConnectWallet, Wallet } from "@coinbase/onchainkit/wallet";
import { Name, Identity } from "@coinbase/onchainkit/identity";
import { FaTimes, FaCopy, FaNetworkWired } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { useClientMounted } from "../../../hooks/useClientMount";
import { useAccount, useDisconnect } from "wagmi";
import Image from "next/image";

export const ConnectButton = () => {
  const { address, chain } = useAccount();
  const { disconnect } = useDisconnect();
  const mounted = useClientMounted();
  const [showDetails, setShowDetails] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // We'll use OnchainKit Identity component with controlled styling

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDetails(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDisconnect = async () => {
    try {
      await disconnect();
      setShowDetails(false);
    } catch (error) {
      console.error("Failed to disconnect", error);
    }
  };

  const copyAddress = async () => {
    if (!address) return;
    try {
      await navigator.clipboard.writeText(address);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy address", error);
    }
  };

  const getNetworkIcon = (chainId?: number) => {
    switch (chainId) {
      case 8453: // Base Mainnet
        return (
          <Image
            src="/baseLogo.jpg"
            alt="Base"
            width={20}
            height={20}
            className="object-contain rounded-md"
          />
        );
      default:
        return <FaNetworkWired className="w-5 h-5 text-[#00daa2]" />;
    }
  };

  const getNetworkName = (chainId?: number) => {
    switch (chainId) {
      case 8453:
        return "Base";
      default:
        return "Unknown Network";
    }
  };

  if (!mounted) return null;

  return (
    <div className="relative flex justify-center" ref={dropdownRef}>
      {!address ? (
        // Show ConnectWallet when not connected
        <Wallet className="z-10 w-full">
          <ConnectWallet className="drvn-wallet-btn relative flex items-center justify-center w-full h-12 rounded-md border border-[#00daa2] bg-transparent hover:bg-transparent font-mono">
            <span className="text-white text-sm font-sans">Connect Wallet</span>
          </ConnectWallet>
        </Wallet>
      ) : (
        // Show custom connected state when connected
        <div className="flex justify-center items-center w-full">
          <button
            onClick={() => setShowDetails(true)}
            className="drvn-wallet-btn flex items-center space-x-2 px-4 py-2 rounded-lg border-2 border-[#00daa2] bg-gray-950 hover:scale-105 transition-all duration-200 w-full"
          >
            {/* Show identity name (Base/Coinbase), ENS name, or shortened address */}
            <div className="text-white font-sans text-sm">
              <Identity className="text-white font-sans text-sm bg-transparent">
                <Name className="text-white font-sans text-sm bg-transparent" />
              </Identity>
            </div>
          </button>
        </div>
      )}

      {/* Custom DRVN Disconnect Modal */}
      {showDetails && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          style={{
            minHeight: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 70,
            width: "100vw",
            height: "100vh",
            maxWidth: "100vw",
            maxHeight: "100vh",
          }}
        >
          {/* Backdrop with car theme */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md"></div>

          {/* Car background overlay */}
          <div className="absolute inset-0 opacity-20">
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: "url('/Cars/GarageV12.jpg')",
                filter: "blur(2px) brightness(0.3)",
              }}
            ></div>
          </div>

          {/* Modal Content - Car-Themed Tech Design */}
          <div
            className="relative w-full max-w-md md:max-w-lg bg-gray-950 rounded-xl border border-white/50 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            {/* Header - Enhanced Car Theme */}
            <div className="relative p-6 border-b border-[#00daa2]/20">
              {/* Tech accent lines with car theme */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00daa2] to-transparent opacity-60"></div>
              <div className="absolute top-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00daa2]/40 to-transparent opacity-30"></div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    {/* Connection status indicator with car styling */}
                    {/* <div className="w-12 h-12 bg-gradient-to-br from-[#00daa2]/20 to-[#00daa2]/5 rounded-full flex items-center justify-center border border-[#00daa2]/30 shadow-lg shadow-[#00daa2]/20">
                          <div className="w-6 h-6 bg-[#00daa2] rounded-full animate-pulse"></div>
                        </div> */}
                  </div>
                  <div>
                    <h3 className="text-[#00daa2] font-mono text-xl font-bold">
                      DRVN/VHCLS Wallet
                    </h3>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-white/80 text-xs font-sans font-medium tracking-wide">
                        VIN:
                      </span>
                      <Identity className="text-white/80 text-xs font-sans font-medium tracking-wide bg-transparent inline">
                        <Name className="text-white/80 text-xs font-sans font-medium tracking-wide bg-transparent" />
                      </Identity>
                      <button
                        onClick={copyAddress}
                        className="text-[#00daa2] hover:text-[#00daa2]/80 transition-colors bg-transparent border-none p-1 rounded hover:bg-[#00daa2]/10"
                      >
                        <FaCopy
                          className={`text-sm ${isCopied ? "animate-bounce" : ""}`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-white/60 hover:text-white p-2 rounded-full hover:bg-white/10 hover:scale-110 transition-transform"
                >
                  <FaTimes className="text-lg" />
                </button>
              </div>

              {/* Network Status - Enhanced Car Theme */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FaNetworkWired className="text-[#00daa2] text-sm" />
                  <span className="text-white/80 font-sans text-xs font-medium tracking-wide">
                    NETWORK
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5">
                  {getNetworkIcon(chain?.id)}
                  <span className="text-white font-mono text-md font-bold">
                    {getNetworkName(chain?.id)}
                  </span>
                </div>
              </div>
            </div>

            {/* Content - Enhanced Car Theme */}
            <div className="p-6 space-y-4">
              {/* System Status - Enhanced Car Grid */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#00daa2] rounded-full animate-pulse"></div>
                  <span className="text-[#00daa2] font-sans text-sm font-bold tracking-wide">
                    SYSTEM STATUS
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="system-status-grid rounded-lg p-3 border border-[#00daa2]/20 text-center engine-status hover:bg-gray-800/40 hover:border-[#00daa2]/40 transition-all duration-300">
                    <div className="text-[#00daa2] font-mono text-xs font-semibold tracking-wide mb-1">
                      ENGINE
                    </div>
                    <div className="text-white font-sans text-sm font-bold">
                      RUNNING
                    </div>
                  </div>
                  <div className="system-status-grid rounded-lg p-3 border border-[#00daa2]/20 text-center transmission-status hover:bg-gray-800/40 hover:border-[#00daa2]/40 transition-all duration-300">
                    <div className="text-[#00daa2] font-mono text-xs font-semibold tracking-wide mb-1">
                      TRANSMISSION
                    </div>
                    <div className="text-white font-sans text-sm font-bold">
                      CONNECTED
                    </div>
                  </div>
                </div>
              </div>

              {/* Disconnect Button - Enhanced Car Theme */}
              <button
                onClick={handleDisconnect}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-red-500/20 to-red-600/10 border-red-500/30 text-white font-sans font-bold"
              >
                <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                  <FaTimes className="text-white text-xs" />
                </div>
                <span className="tracking-wide text-sm">DISCONNECT</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
                .drvn-wallet-btn {
                    box-shadow: 0 0 10px rgba(0, 218, 162, 0.2);
                }
                .drvn-wallet-btn:hover {
                    box-shadow: 0 0 20px rgba(0, 218, 162, 0.4);
                }

                /* Override OnchainKit Identity styling to match our design */
                .drvn-wallet-btn .ock-text-foreground,
                .drvn-wallet-btn .ock-text-inverse,
                .drvn-wallet-btn [data-testid*="ock"],
                .drvn-wallet-btn .ock-identity,
                .drvn-wallet-btn .ock-name {
                    color: #ffffff !important;
                    background: transparent !important;
                    font-family: "Monospace", sans-serif !important;
                    font-size: 0.875rem !important;
                    line-height: 1.25rem !important;
                    border: none !important;
                    padding: 0 !important;
                    margin: 0 !important;
                }

                /* Fix disconnect modal black background and ensure inline display */
                .drvn-wallet-btn .ock-identity,
                .drvn-wallet-btn .ock-name,
                .drvn-wallet-btn [data-testid*="ockIdentity"],
                .drvn-wallet-btn [data-testid*="ockName"] {
                    background: transparent !important;
                    background-color: transparent !important;
                    display: inline !important;
                    border: none !important;
                    padding: 0 !important;
                    margin: 0 !important;
                    box-shadow: none !important;
                    outline: none !important;
                }

                /* Remove any child element styling that might cause black squares */
                .drvn-wallet-btn .ock-identity > *,
                .drvn-wallet-btn .ock-name > *,
                .drvn-wallet-btn [data-testid*="ockIdentity"] > *,
                .drvn-wallet-btn [data-testid*="ockName"] > * {
                    background: transparent !important;
                    background-color: transparent !important;
                    display: inline !important;
                    border: none !important;
                    padding: 0 !important;
                    margin: 0 !important;
                    box-shadow: none !important;
                    outline: none !important;
                }

                /* Force all OnchainKit elements to have transparent backgrounds */
                .drvn-wallet-btn [class*="mini-app"],
                .drvn-wallet-btn [class*="mini-app"] *,
                .drvn-wallet-btn [data-testid*="mini-app"],
                .drvn-wallet-btn [data-testid*="mini-app"] * {
                    background: transparent !important;
                    background-color: transparent !important;
                    background-image: none !important;
                }

                /* Target specific OnchainKit component classes */
                .drvn-wallet-btn .mini-app-identity,
                .drvn-wallet-btn .mini-app-name,
                .drvn-wallet-btn [class*="mini-app-identity"],
                .drvn-wallet-btn [class*="mini-app-name"] {
                    background: transparent !important;
                    background-color: transparent !important;
                    background-image: none !important;
                    box-shadow: none !important;
                }


            `}</style>
    </div>
  );
};
