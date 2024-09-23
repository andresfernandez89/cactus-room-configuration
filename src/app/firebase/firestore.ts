import { collection, getDocs, getFirestore } from "firebase/firestore";
import app from "./firebaseConfig";

const db = getFirestore(app);
async function getPoints() {
  const querySnapshot = await getDocs(collection(db, "points"));
  const points = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    data: doc.data(),
  }));
  return points;
}

export { getPoints };
