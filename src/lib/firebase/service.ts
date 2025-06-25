import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  limit,
  orderBy,
} from "firebase/firestore";
import app from "./init";
import bcrypt from "bcrypt";

const firestore = getFirestore(app);

// Tipe untuk data dokumen
type FirestoreDocument = {
  id: string;
  [key: string]: unknown; // Untuk bidang dinamis dalam dokumen
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
): Promise<unknown | null> {
  if (!collectionName || !id) {
    throw new Error(
      `retrieveDataById: Parameter tidak valid — collectionName: ${collectionName}, id: ${id}`
    );
  }

  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data();
  return data || null;
}

export async function retrieveDataByField(
  collectionName: string,
  field: string,
  value: string
) {
  if (!collectionName || !field || value === undefined) {
    throw new Error(
      `retrieveDataByField: Parameter tidak valid - collection: ${collectionName}, field: ${field}, value: ${value}`
    );
  }

  const q = query(
    collection(firestore, collectionName),
    where(field, "==", value)
  );
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

export async function signUp(userData: UserData): Promise<boolean> {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", userData.email)
  );
  const snapshot = await getDocs(q);

  if (!snapshot.empty) return false;

  const newUser = {
    ...userData,
    password: await bcrypt.hash(userData.password, 10),
    role: userData.role || "member",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  await addDoc(collection(firestore, "users"), newUser);
  return true;
}

export async function updateData(
  collectionName: string,
  id: string,
  data: any,
  callback: Function
) {
  const docRef = doc(firestore, collectionName, id);
  await updateDoc(docRef, data)
    .then(() => {
      callback(true);
    })
    .catch(() => {
      callback(false);
    });
}

export async function addData(
  collectionName: string,
  data: any,
  callback: Function
) {
  await addDoc(collection(firestore, collectionName), data)
    .then(() => {
      callback(true);
    })
    .catch((error) => {
      callback(false);
      console.log(error);
    });
}

export async function deleteData(
  collectionName: string,
  id: string,
  callback: Function
) {
  const docRef = doc(firestore, collectionName, id);
  await deleteDoc(docRef)
    .then(() => {
      callback(true);
    })
    .catch(() => {
      callback(false);
    });
}

export async function getLimitedProducts(
  collectionName: string,
  limitCount: number
): Promise<FirestoreDocument[]> {
  if (!collectionName || !limitCount) {
    throw new Error(
      "Parameter tidak valid: collectionName atau limitCount tidak boleh kosong"
    );
  }

  const q = query(
    collection(firestore, collectionName),
    orderBy("createdAt", "desc"),
    limit(limitCount)
  );
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}
