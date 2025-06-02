import axios from 'axios';
import { signUpUser } from './firebaseAuth';
import { sendEmailVerification } from 'firebase/auth';

export const registerUser = async (
  fullName: string,
  email: string,
  password: string,
  clientId: string
) => {
  const cred = await signUpUser(email, password);

  // ✅ Trigger email verification
  await sendEmailVerification(cred.user);

  // ✅ Save user info to Firestore via your API
  await axios.post('/api/auth/register', {
    uid: cred.user.uid,
    fullName,
    email,
    clientId,
  });

  // ✅ Set Firebase ID token in cookie so middleware can recognize logged-in session
  const token = await cred.user.getIdToken();
  document.cookie = `__session=${token}; path=/; max-age=3600`;

  return cred.user;
};
