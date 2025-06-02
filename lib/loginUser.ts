import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseAuth';

export const loginUser = async (
  email: string,
  password: string
): Promise<{ ok: boolean; error?: string }> => {
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);

    if (!cred.user.emailVerified) {
      return {
        ok: false,
        error: 'Please verify your email before logging in.',
      };
    }

    // ✅ Set cookie with Firebase ID token for middleware
    const token = await cred.user.getIdToken();

    document.cookie = `__session=${token}; path=/; max-age=3600`;

    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
};
