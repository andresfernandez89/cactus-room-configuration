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
        const svgImage = new window.Image();
        svgImage.src = "/icons/fingerprintIcon.svg";

        baseImage.onload = () => {
          // base image
          context.drawImage(baseImage, 0, 0, canvas.width, canvas.height);

          svgImage.onload = () => {
            points.forEach((point) => {
              const coordX = (point.coordX * canvas.width) / 100;
              const coordY = (point.coordY * canvas.height) / 100;

              // outer ring
              context.globalAlpha = 0.6;
              context.beginPath();
              context.arc(coordX + 15, coordY + 15, 28, 0, 2 * Math.PI);
              context.fillStyle = "#333";
              context.fill();

              // white ring
              context.globalAlpha = 0.6;
              context.beginPath();
              context.arc(coordX + 15, coordY + 15, 25, 0, 2 * Math.PI);
              context.lineWidth = 2;
              context.strokeStyle = "white";
              context.stroke();

              // Inner circle
              context.globalAlpha = 0.2;
              context.beginPath();
              context.arc(coordX + 15, coordY + 15, 20, 0, 2 * Math.PI);
              context.fillStyle = "#94a3b8";
              context.fill();
              context.globalAlpha = 0.6;

              //svg fingerprint
              context.drawImage(svgImage, coordX, coordY, 30, 30);
            });
          };
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
