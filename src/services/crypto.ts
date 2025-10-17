// src/services/crypto.ts
import * as Crypto from 'expo-crypto';
import { Buffer } from 'buffer';

export const encrypt = async (plaintext: string): Promise<string> => {
  const iv = await Crypto.getRandomBytesAsync(12);

  const ciphertext = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, plaintext);

  const encryptedPayload = {
    iv: Buffer.from(iv).toString('base64'),
    ciphertext: Buffer.from(ciphertext).toString('base64'),
  };

  return JSON.stringify(encryptedPayload);
};

export const decrypt = async (encryptedJson: string): Promise<string> => {
  const { ciphertext: ciphertextBase64 } = JSON.parse(encryptedJson);

  console.warn(
    'La función de descifrado es una simulación. Se necesita implementación nativa para AES real.'
  );

  return Buffer.from(ciphertextBase64, 'base64').toString('hex');
};
