import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import app from "./init";
import bcrypt from "bcrypt";

const firestore = getFirestore(app);

// Tipe untuk data dokumen
type FirestoreDocument = {
  id: string;
  [key: string]: any; // Untuk bidang dinamis dalam dokumen
};

// Tipe untuk data pengguna
interface UserData {
  email: string;
  fullname: string;
  phone: string;
  password: string;
  role?: string;
}

// Tipe untuk callback function
type SignUpCallback = (success: boolean) => void;

export async function retrieveData(
  collectionName: string
): Promise<FirestoreDocument[]> {
  const snapshot = await getDocs(collection(firestore, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

export async function retrieveDataById(
  collectionName: string,
  id: string
): Promise<any | null> {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data();
  return data || null;
}

export async function signUp(
  userData: UserData,
  callback: SignUpCallback
): Promise<void> {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", userData.email)
  );
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (data.length > 0) {
    callback(false);
  } else {
    if (!userData.role) {
      userData.role = "member";
    }
    userData.password = await bcrypt.hash(userData.password, 10);
    await addDoc(collection(firestore, "users"), userData)
      .then(() => {
        callback(true);
      })
      .catch((error) => {
        callback(false);
        console.error("Error adding user:", error);
      });
  }
}

export async function signIn(email: string): Promise<FirestoreDocument | null> {
  const q = query(collection(firestore, "users"), where("email", "==", email));
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (data && data.length > 0) {
    return data[0];
  } else {
    return null;
  }
}
