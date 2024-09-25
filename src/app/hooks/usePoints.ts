import { getPoints } from "@/firebase/firestore";
import { useEffect, useMemo, useState } from "react";

type Point = {
  id: string;
  coordX: number;
  coordY: number;
  name: string;
};

const usePoints = () => {
  const [points, setPoints] = useState<Point[]>([]);

  useEffect(() => {
    getPoints().then((p) => setPoints(p));
  }, []);

  const memoizedPoints = useMemo(() => points, [points]);

  return memoizedPoints;
};

export default usePoints;
