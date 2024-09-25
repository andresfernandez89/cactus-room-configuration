import { getMaterials } from "@/firebase/firestore";
import { useEffect, useMemo, useState } from "react";

export interface Material {
  layers: Record<string, string>;
  materialPreview: string;
  name: string;
  points: string[];
  layerUrl: string;
}

const useMaterials = (pointId: string | null) => {
  const [materials, setMaterials] = useState<Material[]>([]);

  useEffect(() => {
    if (pointId) {
      getMaterials(pointId).then((m) => setMaterials(m as Material[]));
    }
  }, [pointId]);

  const memoizedMaterials = useMemo(() => materials, [materials]);

  return memoizedMaterials;
};

export { useMaterials };
