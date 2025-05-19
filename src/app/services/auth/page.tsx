import { retrieveDataByField } from "@/lib/firebase/service";
import { addDoc, collection } from "firebase/firestore";
import app from "@/lib/firebase/init";
import { getFirestore } from "firebase/firestore";

const firestore = getFirestore(app);

interface FirestoreDocument {
  id: string;
  [key: string]: any;
}

export async function signIn(email: string): Promise<FirestoreDocument | null> {
  const data = await retrieveDataByField("users", "email", email);

  if (data && data.length > 0) {
    return data[0];
  } else {
    return null;
  }
}

export async function loginWithGoogle(data: any, callback: Function) {
  try {
    const user = await retrieveDataByField("users", "email", data.email);

    if (user && user.length > 0) {
      return callback(user[0]);
    }

    // Jika user belum ada, buat user baru
    const docRef = await addDoc(collection(firestore, "users"), data);

    // Tambahkan ID ke data untuk dikembalikan
    const newUserData = { id: docRef.id, ...data };
    return callback(newUserData);
  } catch (error: unknown) {
    console.error("Error during Google login:", error);

    let errorMessage = "Terjadi kesalahan saat login dengan Google";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return callback({
      status: false,
      message: errorMessage,
    });
  }
}
