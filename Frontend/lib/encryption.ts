import crypto from "node:crypto";

// User interface for type safety
interface User {
  _id?: string;
  id?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  xHandle?: string;
  profileImage?: string;
  walletAddress?: string;
  bio?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: unknown;
}

// Encryption configuration
const ALGORITHM = "aes-256-gcm";
const KEY_LENGTH = 32; // 256 bits
const IV_LENGTH = 16; // 128 bits
const TAG_LENGTH = 16; // 128 bits

/**
 * Generate a secure encryption key from environment variable
 * Falls back to a default key for development (should be changed in production)
 */
function getEncryptionKey(): Buffer {
  const keyString =
    process.env.ENCRYPTION_KEY ||
    "default-dev-key-change-in-production-32chars";

  if (keyString.length < 32) {
    throw new Error("ENCRYPTION_KEY must be at least 32 characters long");
  }

  return crypto.scryptSync(keyString, "salt", KEY_LENGTH);
}

/**
 * Encrypt sensitive data
 * @param text - The text to encrypt
 * @returns Encrypted data as base64 string
 */
export function encrypt(text: string): string {
  if (!text) return text;

  try {
    const key = getEncryptionKey();
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    cipher.setAAD(Buffer.from("drvn-app", "utf8"));

    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");

    const tag = cipher.getAuthTag();

    // Combine IV + tag + encrypted data
    const combined = Buffer.concat([iv, tag, Buffer.from(encrypted, "hex")]);
    return combined.toString("base64");
  } catch (error) {
    console.error("Encryption error:", error);
    throw new Error("Failed to encrypt data");
  }
}

/**
 * Decrypt sensitive data
 * @param encryptedText - The encrypted text as base64 string
 * @returns Decrypted data as string
 */
export function decrypt(encryptedText: string): string {
  if (!encryptedText) return encryptedText;

  // First, check if the text looks like it might be unencrypted
  // If it doesn't look like base64 or is too short, return as-is
  if (encryptedText.length < 32 || !/^[A-Za-z0-9+/]+=*$/.test(encryptedText)) {
    console.warn("Data does not appear to be encrypted, returning as-is");
    return encryptedText;
  }

  try {
    const key = getEncryptionKey();
    const combined = Buffer.from(encryptedText, "base64");

    // Check if the data is long enough to contain IV + tag + encrypted data
    const minLength = IV_LENGTH + TAG_LENGTH + 1; // At least 1 byte of encrypted data
    if (combined.length < minLength) {
      console.warn("Encrypted data too short, might be unencrypted data");
      return encryptedText; // Return as-is if it's too short
    }

    // Extract IV, tag, and encrypted data
    const iv = combined.subarray(0, IV_LENGTH);
    const tag = combined.subarray(IV_LENGTH, IV_LENGTH + TAG_LENGTH);
    const encrypted = combined.subarray(IV_LENGTH + TAG_LENGTH);

    // Check if tag is valid (not all zeros)
    if (tag.length === 0 || tag.every((byte) => byte === 0)) {
      console.warn("Invalid authentication tag, might be unencrypted data");
      return encryptedText; // Return as-is if tag is invalid
    }

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAAD(Buffer.from("drvn-app", "utf8"));
    decipher.setAuthTag(tag);

    let decrypted = decipher.update(encrypted, undefined, "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  } catch (error) {
    console.error("Decryption error:", error);
    // If decryption fails, return the original text (might be unencrypted)
    console.warn(
      "Decryption failed, returning original text (might be unencrypted)",
    );
    return encryptedText;
  }
}

/**
 * Hash sensitive data for comparison (one-way)
 * @param text - The text to hash
 * @returns Hashed data as hex string
 */
export function hash(text: string): string {
  if (!text) return text;

  const key = getEncryptionKey();
  return crypto.createHmac("sha256", key).update(text).digest("hex");
}

/**
 * Encrypt user object, preserving non-sensitive fields
 * @param user - User object to encrypt
 * @returns User object with sensitive fields encrypted
 */
export function encryptUserData(user: User): User {
  if (!user) return user;

  const encryptedUser = { ...user };

  // Fields to encrypt (profileImage excluded as it needs to be a valid URL)
  const sensitiveFields = ["email", "firstName", "lastName", "bio"];

  sensitiveFields.forEach((field) => {
    if (encryptedUser[field] && typeof encryptedUser[field] === "string") {
      encryptedUser[field] = encrypt(encryptedUser[field]);
    }
  });

  return encryptedUser;
}

/**
 * Check if data appears to be encrypted
 * @param text - Text to check
 * @returns True if data appears encrypted
 */
function isEncryptedData(text: string): boolean {
  // Check if it looks like base64 and is long enough to be encrypted
  if (!text || text.length < 32 || !/^[A-Za-z0-9+/]+=*$/.test(text)) {
    return false;
  }

  try {
    const combined = Buffer.from(text, "base64");
    const minLength = IV_LENGTH + TAG_LENGTH + 1; // IV + tag + 1 byte encrypted data
    return combined.length >= minLength;
  } catch {
    return false;
  }
}

/**
 * Decrypt user object, preserving non-sensitive fields
 * @param user - User object to decrypt
 * @returns User object with sensitive fields decrypted
 */
export function decryptUserData(user: User): User {
  if (!user) return user;

  const decryptedUser = { ...user };

  // Fields to decrypt (profileImage excluded as it needs to be a valid URL)
  const sensitiveFields = ["email", "firstName", "lastName", "bio"];

  sensitiveFields.forEach((field) => {
    if (decryptedUser[field] && typeof decryptedUser[field] === "string") {
      // Only try to decrypt if the data looks encrypted
      if (isEncryptedData(decryptedUser[field])) {
        try {
          const decryptedValue = decrypt(decryptedUser[field]);
          decryptedUser[field] = decryptedValue;
        } catch (error) {
          // If decryption fails, it might be unencrypted data (for migration)
          console.warn(
            `Failed to decrypt field ${field}, keeping original value:`,
            error instanceof Error ? error.message : String(error),
          );
        }
      }
      // If data doesn't look encrypted, leave it as-is
    }
  });

  return decryptedUser;
}

/**
 * Create a safe user object for API responses (removes sensitive data)
 * @param user - User object
 * @returns Safe user object without sensitive fields
 */
export function createSafeUserResponse(user: User): User {
  if (!user) return user;

  const safeUser = { ...user };

  // Handle sensitive fields with appropriate masking
  const sensitiveFields = ["email", "firstName", "lastName", "bio"];

  sensitiveFields.forEach((field) => {
    if (safeUser[field] && typeof safeUser[field] === "string") {
      // Only show first 2 characters + *** for sensitive fields
      const value = safeUser[field] as string;
      if (value.length > 2) {
        safeUser[field] = value.substring(0, 2) + "***";
      } else {
        safeUser[field] = "***";
      }
    }
  });

  // profileImage is not encrypted, so it should remain as a valid URL
  // If no profile image, use default
  if (!safeUser.profileImage) {
    safeUser.profileImage = "/Cars/UserImage.png";
  }

  return safeUser;
}

/**
 * Create a user object for editing purposes (shows real decrypted data)
 * @param user - User object
 * @returns User object with decrypted data for editing
 */
export function createEditableUserResponse(user: User): User {
  if (!user) return user;

  const editableUser = { ...user };

  // Decrypt sensitive fields for editing
  const sensitiveFields = ["email", "firstName", "lastName", "bio"];

  sensitiveFields.forEach((field) => {
    if (editableUser[field] && typeof editableUser[field] === "string") {
      // Only try to decrypt if the data looks encrypted
      if (isEncryptedData(editableUser[field])) {
        try {
          // Try to decrypt the field
          const decryptedValue = decrypt(editableUser[field]);
          editableUser[field] = decryptedValue;
        } catch (error) {
          // If decryption fails, keep original value (might be unencrypted)
          console.warn(
            `Failed to decrypt field ${field} for editing, keeping original value:`,
            error instanceof Error ? error.message : String(error),
          );
        }
      }
      // If data doesn't look encrypted, leave it as-is
    }
  });

  // profileImage is not encrypted, so it should remain as a valid URL
  // If no profile image, use default
  if (!editableUser.profileImage) {
    editableUser.profileImage = "/Cars/UserImage.png";
  }

  return editableUser;
}
