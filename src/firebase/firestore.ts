import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import app from "./firebaseConfig";

const db = getFirestore(app);

type Point = {
  coordX: number;
  coordY: number;
  name: string;
};

async function getPoints(): Promise<Point[]> {
  const querySnapshot = await getDocs(collection(db, "points"));
  const points: Point[] = querySnapshot.docs.map((doc) => ({
    coordX: doc.data().coordX,
    coordY: doc.data().coordY,
    name: doc.data().name,
  }));
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
