/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";

const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY;
const PINATA_SECRET_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY;

// Base URL for IPFS gateway
const IPFS_GATEWAY = process.env.NEXT_PUBLIC_IPFS_GATEWAY;

export const getIpfsHash = async (
  data: Record<string, any>,
): Promise<string> => {
  if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
    throw new Error("Pinata API keys are not configured");
  }

  try {
    const response = await fetch(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_KEY,
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `HTTP ${response.status}: ${response.statusText}`,
      );
    }

    const result = await response.json();
    return result.IpfsHash;
  } catch (error) {
    console.error("Error uploading JSON to IPFS:", error);
    throw error;
  }
};

export const getIpfsHashFromFile = async (
  file: File,
  onProgress?: (percent: number) => void,
): Promise<string> => {
  if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
    throw new Error("Pinata API keys are not configured");
  }

  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        headers: {
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_KEY,
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total,
            );
            onProgress(percent);
          }
        },
      },
    );

    return response.data.IpfsHash;
  } catch (error) {
    console.error("Error uploading file to IPFS:", error);
    throw error;
  }
};

export const getIpfsUrl = (hash: string): string => {
  return `${IPFS_GATEWAY}${hash}`;
};

export const uploadImageToIpfs = async (
  file: File,
  onProgress?: (percent: number) => void,
): Promise<string> => {
  try {
    const hash = await getIpfsHashFromFile(file, onProgress);
    return getIpfsUrl(hash);
  } catch (error) {
    console.error("Error uploading image to IPFS:", error);
    throw error;
  }
};
