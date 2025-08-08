// @ts-nocheck
// Simple AES-GCM encryption for credential storage

const ALGORITHM = 'AES-GCM';
const KEY_LENGTH = 256;
const IV_LENGTH = 12;

// Derive a key from a PIN using PBKDF2
const deriveKey = async (pin, salt) => {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(pin),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: ALGORITHM, length: KEY_LENGTH },
    false,
    ['encrypt', 'decrypt']
  );
};

// Generate a random salt
const generateSalt = () => {
  return crypto.getRandomValues(new Uint8Array(16));
};

// Generate a random IV
const generateIV = () => {
  return crypto.getRandomValues(new Uint8Array(IV_LENGTH));
};

// Encrypt data with PIN
export const encrypt = async (data, pin) => {
  try {
    const encoder = new TextEncoder();
    const salt = generateSalt();
    const iv = generateIV();
    const key = await deriveKey(pin, salt);
    
    const encrypted = await crypto.subtle.encrypt(
      { name: ALGORITHM, iv: iv },
      key,
      encoder.encode(JSON.stringify(data))
    );

    // Combine salt, iv, and encrypted data
    const result = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
    result.set(salt, 0);
    result.set(iv, salt.length);
    result.set(new Uint8Array(encrypted), salt.length + iv.length);

    return btoa(String.fromCharCode(...result));
  } catch (error) {
    console.error('Encryption failed:', error);
    throw new Error('Failed to encrypt data');
  }
};

// Decrypt data with PIN
export const decrypt = async (encryptedData, pin) => {
  try {
    const decoder = new TextDecoder();
    const data = new Uint8Array(
      atob(encryptedData)
        .split('')
        .map(char => char.charCodeAt(0))
    );

    // Extract salt, iv, and encrypted data
    const salt = data.slice(0, 16);
    const iv = data.slice(16, 16 + IV_LENGTH);
    const encrypted = data.slice(16 + IV_LENGTH);

    const key = await deriveKey(pin, salt);
    
    const decrypted = await crypto.subtle.decrypt(
      { name: ALGORITHM, iv: iv },
      key,
      encrypted
    );

    return JSON.parse(decoder.decode(decrypted));
  } catch (error) {
    console.error('Decryption failed:', error);
    throw new Error('Failed to decrypt data - incorrect PIN?');
  }
};

// Test if PIN is correct by trying to decrypt a test value
export const testPin = async (pin, testData) => {
  try {
    await decrypt(testData, pin);
    return true;
  } catch {
    return false;
  }
};

// Create a test encrypted value for PIN validation
export const createPinTest = async (pin) => {
  return encrypt({ test: 'pin_validation' }, pin);
};
