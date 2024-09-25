import { getPoints } from "@/app/firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { PointTypes } from "../types/firestore";

const usePoints = () => {
  const [points, setPoints] = useState<PointTypes[]>([]);
  useEffect(() => {
    getPoints().then((p) => setPoints(p));
  }, []);

  const memoizedPoints = useMemo(() => points, [points]);
  return memoizedPoints;
};

export default usePoints;
