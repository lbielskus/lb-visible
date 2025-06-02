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

    // 🔑 Get Firebase ID token
    const token = await cred.user.getIdToken();

    // 🚀 Send token to server to set cookie
    const res = await fetch('/api/login-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });

    if (!res.ok) {
      const data = await res.json();
      return { ok: false, error: data.error || 'Failed to set session cookie' };
    }

    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
};
