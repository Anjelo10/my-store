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
  getCountFromServer,
  getDocsFromServer,
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
  limitCount: number,
  useCache: boolean = true
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
  const snapshot = useCache ? await getDocs(q) : await getDocsFromServer(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function getUserCountUsers(): Promise<number> {
  const userColection = collection(firestore, "users");
  const snapshot = await getCountFromServer(userColection);
  return snapshot.data().count;
}
export async function getUserCountProducts(): Promise<number> {
  const userColection = collection(firestore, "product");
  const snapshot = await getCountFromServer(userColection);
  return snapshot.data().count;
}

export async function getTotalTransaction(): Promise<number> {
  const transactionRef = collection(firestore, "users");
  const snapshot = await getDocs(transactionRef);

  let totalSemuaUser = 0;
  snapshot.forEach((doc) => {
    const userData = doc.data();
    console.log(doc.data());
    const items = userData?.transaction;
    console.log(items);
    if (Array.isArray(items)) {
      const totalUser = items.reduce((sum, tx) => {
        if (typeof tx.total === "number" && tx.status === "settlement") {
          return sum + tx.total;
        }
        return sum;
      }, 0);
      console.log(`User ${doc.id} total belanja: ${totalUser}`);
      totalSemuaUser += totalUser;
    } else {
      console.log(`User ${doc.id} tidak memiliki transaksi`);
    }
  });
  return totalSemuaUser;
}
