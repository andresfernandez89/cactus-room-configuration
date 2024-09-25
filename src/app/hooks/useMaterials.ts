import { getMaterials } from "@/app/firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { MaterialTypes } from "../types/firestore";

const useMaterials = (pointId: string | null) => {
  const [materials, setMaterials] = useState<MaterialTypes[]>([]);

  useEffect(() => {
    if (pointId) {
      getMaterials(pointId).then((m) => setMaterials(m as MaterialTypes[]));
    }
  }, [pointId]);

  const memoizedMaterials = useMemo(() => materials, [materials]);

  return memoizedMaterials;
};

export { useMaterials };
