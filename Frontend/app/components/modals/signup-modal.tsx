"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { X, Upload, Loader2 } from "lucide-react";
import { useAccount } from "wagmi";
import Image from "next/image";
import {} from // Wallet,
// WalletDropdown,
// WalletDropdownDisconnect,
// ConnectWallet,
"@coinbase/onchainkit/wallet";
import {} from // Name,
// Avatar,
// Address,
// EthBalance,
"@coinbase/onchainkit/identity";
import { uploadImageToIpfs } from "../../../utils/ipfs";
import { ConnectButton } from "../web3/ConnectButton";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignin: () => void;
  onSuccess: () => void;
}

export function SignupModal({
  isOpen,
  onClose,
  onSwitchToSignin,
  onSuccess,
}: SignupModalProps) {
  const { address } = useAccount();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    xHandle: "",
    profileImage: "",
    bio: "", // Add bio field
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  // Check if all required fields are filled
  const isFormValid =
    address &&
    formData.firstName.trim() !== "" &&
    formData.lastName.trim() !== "" &&
    formData.username.trim() !== "" &&
    formData.email.trim() !== "";

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);

    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadToIpfs = async (): Promise<string> => {
    if (!selectedFile) {
      throw new Error("No file selected");
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const ipfsUrl = await uploadImageToIpfs(selectedFile, (progress) => {
        setUploadProgress(progress);
      });

      setIsUploading(false);
      setUploadProgress(0);
      return ipfsUrl;
    } catch (error) {
      setIsUploading(false);
      setUploadProgress(0);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!address) {
      setError("Please connect your wallet first");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // If user selected a custom image, upload it to IPFS first
      let finalProfileImage = formData.profileImage;

      if (
        selectedFile &&
        !formData.profileImage.startsWith(
          "https://app.drvnlabo.mypinata.cloud/ipfs/",
        )
      ) {
        try {
          finalProfileImage = await handleUploadToIpfs();
          console.log("Image uploaded to IPFS:", finalProfileImage);
        } catch (uploadError) {
          console.error("Failed to upload image to IPFS:", uploadError);
          setError(
            "Failed to upload profile image. Please try again or use the default image.",
          );
          setIsLoading(false);
          return;
        }
      }

      // Debug: Log what's being sent
      console.log("Form data being sent:", {
        ...formData,
        profileImage: finalProfileImage,
        walletAddress: address,
      });

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          profileImage: finalProfileImage,
          walletAddress: address,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Signup failed");
      }

      setSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        xHandle: "",
        profileImage: "",
        bio: "",
      });
      setSelectedFile(null);
      setPreviewUrl("");

      // Call onSuccess callback and close modal after a short delay
      setTimeout(() => {
        onSuccess();
        onClose();
        setSuccess(false);
      }, 2000);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-gray-950 border-gray-800 max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 sticky top-0 bg-gray-900 z-10">
          <CardTitle className="text-white text-xl font-mono">
            Sign Up
          </CardTitle>
          <Button
            variant="outline"
            size="icon"
            onClick={onClose}
            className="text-red-500 border border-red-500 rounded-full size-6"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {success ? (
            <div className="text-center py-8">
              <div className="text-[#00daa2] text-lg font-mono mb-2">
                Success!
              </div>
              <div className="text-gray-300 text-sm font-mono">
                Your account has been created successfully.
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 font-mono">
                    First Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    className="bg-gray-950 border-gray-700 text-white placeholder:text-gray-400 font-mono"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 font-mono">
                    Last Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    className="bg-gray-950 border-gray-700 text-white placeholder:text-gray-400 font-mono"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 font-mono">
                  Username
                </label>
                <Input
                  type="text"
                  placeholder="Choose a unique username"
                  value={formData.username}
                  onChange={(e) =>
                    handleInputChange("username", e.target.value)
                  }
                  className="bg-gray-950 border-gray-700 text-white placeholder:text-gray-400 font-mono"
                  required
                />
                <div className="text-xs text-gray-400 font-mono">
                  3-20 characters, letters, numbers, and underscores only
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 font-mono">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="bg-gray-950 border-gray-700 text-white placeholder:text-gray-400 font-mono"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 font-mono">
                  X/Twitter Handle (Optional)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    @
                  </span>
                  <Input
                    type="text"
                    placeholder="@yourhandle"
                    value={formData.xHandle}
                    onChange={(e) =>
                      handleInputChange("xHandle", e.target.value)
                    }
                    className="bg-gray-950 border-gray-700 text-white placeholder:text-gray-400 font-mono pl-8"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 font-mono">
                  Bio (Optional)
                </label>
                <textarea
                  placeholder="Tell us about yourself..."
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  className="w-full bg-gray-950 border border-gray-700 text-white placeholder:text-gray-400 font-mono p-3 rounded-md resize-none"
                  rows={3}
                />
                <div className="text-xs text-gray-400 font-mono">
                  Tell us a bit about yourself (max 500 characters)
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 font-mono">
                  Profile Picture
                </label>
                <div className="flex items-center gap-4">
                  {previewUrl ? (
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#00daa2] relative">
                      <Image
                        src={previewUrl}
                        alt="Profile Preview"
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                      {isUploading && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Loader2 className="h-4 w-4 animate-spin text-[#00daa2]" />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-600 flex items-center justify-center">
                      <div className="text-gray-400 text-xs text-center">
                        No image
                      </div>
                    </div>
                  )}
                  <div className="flex-1 space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleFileSelect(file);
                          // Set a temporary profile image URL for form validation
                          handleInputChange("profileImage", "temp-upload");
                        }
                      }}
                      className="hidden"
                      id="profile-image-upload"
                      disabled={isUploading}
                    />
                    <label
                      htmlFor="profile-image-upload"
                      className={`cursor-pointer bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-mono transition-colors flex items-center gap-2 ${
                        isUploading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <Upload className="h-4 w-4" />
                      {isUploading
                        ? `Uploading... ${uploadProgress}%`
                        : "Upload Image"}
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFile(null);
                        setPreviewUrl("");
                        handleInputChange(
                          "profileImage",
                          "/Cars/UserImage.png",
                        );
                      }}
                      className="block w-full text-center bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-mono transition-colors"
                      disabled={isUploading}
                    >
                      Use Default
                    </button>
                  </div>
                </div>
                <div className="text-xs text-gray-400 font-mono">
                  Upload a profile picture or use the default. Images will be
                  stored on IPFS.
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 font-mono">
                  Connect Wallet
                </label>
                <div className="p-4">
                  {address ? (
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-[#00daa2] rounded-full"></div>
                      <div className="flex-1">
                        <div className="text-[#00daa2] text-sm font-mono font-medium">
                          Connected
                        </div>
                        <div className="text-gray-400 text-xs font-mono">
                          {address.slice(0, 6)}...{address.slice(-4)}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <ConnectButton />
                  )}
                </div>
              </div>

              {error && (
                <div className="text-red-400 text-sm font-mono">{error}</div>
              )}

              <Button
                type="submit"
                disabled={!isFormValid || isLoading || isUploading}
                className="w-full bg-[#00daa2] text-black hover:bg-[#00daa2] font-medium font-mono disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating Account..." : "Sign Up"}
              </Button>
            </form>
          )}

          <div className="text-center">
            <span className="text-gray-400 text-sm font-mono">
              Already have an account?{" "}
            </span>
            <button
              onClick={onSwitchToSignin}
              className="text-green-400 hover:text-green-300 text-sm font-medium font-mono"
            >
              Sign In
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
