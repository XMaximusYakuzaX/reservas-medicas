import { PhoneAuthProvider, signInWithCredential, Auth } from 'firebase/auth';

export async function verifyOTP(auth: Auth, verificationId: string, code: string) {
  const credential = PhoneAuthProvider.credential(verificationId, code);
  return await signInWithCredential(auth, credential);
}
