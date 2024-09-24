import { getPoints } from "@/firebase/firestore";
import { useEffect, useState } from "react";

type Point = {
  coordX: number;
  coordY: number;
  name: string;
};

const usePoints = () => {
  const [points, setPoints] = useState<Point[]>([]);

  useEffect(() => {
    getPoints().then((p) => setPoints(p));
  }, []);

  return points;
};

export default usePoints;
