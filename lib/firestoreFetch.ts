// lib/firestoreFetch.ts
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

export async function getProducts() {
  const snapshot = await getDocs(
    collection(db, 'clients', 'your-client-id', 'products')
  );
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
