import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import app from "./firebaseConfig";

const db = getFirestore(app);

async function getPoints() {
  const querySnapshot = await getDocs(collection(db, "points"));
  const points = querySnapshot.docs.map((doc) => doc);
  return points;
}

async function getMaterials(pointId: string) {
  const q = query(
    collection(db, "materials"),
    where("points", "array-contains", pointId),
  );
  const querySnapshot = await getDocs(q);
  const materials = querySnapshot.docs.map((doc) => doc.data());
  return materials;
}

export { getMaterials, getPoints };
