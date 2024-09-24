"use client";
import { useEffect, useRef } from "react";
//import { getPoints } from "@/firebase/firestore";

const RoomConfigurator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      const baseImage = new window.Image();
      baseImage.src = "/images/base.webp";

      baseImage.onload = () => {
        if (context) {
          context.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
        }
      };
    }
  }, []);

  return (
    <div className="w-full max-md:max-w-md md:max-w-6xl mx-auto">
      <canvas
        ref={canvasRef}
        className="w-full h-auto"
        width={800}
        height={600}
      />
    </div>
  );
};

export default RoomConfigurator;
