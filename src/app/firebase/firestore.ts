import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { PointTypes } from "../types/firestore";
import app from "./firebaseConfig";

const db = getFirestore(app);

async function getPoints(): Promise<PointTypes[]> {
  const querySnapshot = await getDocs(collection(db, "points"));
  const points: PointTypes[] = querySnapshot.docs.map((doc) => ({
    id: doc.id,
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

  const materials = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    const layerUrls = data.layers;
    const layerUrl = layerUrls[pointId];

    return {
      ...data,
      layerUrl: layerUrl || null,
    };
  });

  return materials;
}

export { getMaterials, getPoints };
