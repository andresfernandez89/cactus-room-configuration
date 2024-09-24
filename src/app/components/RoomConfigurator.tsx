"use client";
import { getPoints } from "@/firebase/firestore";
import { useEffect, useRef, useState } from "react";

type Point = {
  coordX: number;
  coordY: number;
  name: string;
};

const RoomConfigurator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [points, setPoints] = useState<Point[]>([]);

  useEffect(() => {
    getPoints().then((p: Point[]) => setPoints(p));

    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context instanceof CanvasRenderingContext2D) {
        const baseImage = new window.Image();
        baseImage.src = "/images/base.webp";

        baseImage.onload = () => {
          context.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
          console.log(points);
          points.forEach((point) => {
            const coordX = (point.coordX * canvas.width) / 100;
            const coordY = (point.coordY * canvas.height) / 100;
            context.fillStyle = "red";
            context.beginPath();
            context.arc(coordX, coordY, 15, 0, 2 * Math.PI);
            context.fill();
            context.fillStyle = "white";
            context.beginPath();
            context.arc(coordX, coordY, 15 / 2, 0, 2 * Math.PI);
            context.fill();
          });
        };
      }
    }
  }, [points]);

  return (
    <div className="w-full max-md:max-w-md md:max-w-6xl mx-auto">
      <canvas
        ref={canvasRef}
        className="w-full h-auto border"
        width={1240}
        height={873}
      />
    </div>
  );
};

export default RoomConfigurator;
