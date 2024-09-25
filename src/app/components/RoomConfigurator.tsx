"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const RoomConfigurator = () => {
  const points = [
    {
      id: "EnRd7hAaNydVdVJ06qgF",
      coordX: 40,
      coordY: 86,
      name: "Pavimento",
    },
    {
      id: "Ks5CthbPwAvd2TNxzHEl",
      coordX: 71,
      coordY: 38,
      name: "Frente",
    },
    {
      id: "cd84QwP9gOhAU5p47UDn",
      coordX: 52,
      coordY: 55,
      name: "Encimera",
    },
    {
      id: "i7EVutewtycZY2qwmldG",
      coordX: 61,
      coordY: 47,
      name: "Entrepaños",
    },
  ];

  const imageRef = useRef<HTMLImageElement | null>(null);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  const updateImageDimensions = () => {
    if (imageRef.current) {
      const { width, height } = imageRef.current.getBoundingClientRect();
      setImageDimensions({ width, height });
    }
  };

  useEffect(() => {
    updateImageDimensions();

    window.addEventListener("resize", updateImageDimensions);

    return () => {
      window.removeEventListener("resize", updateImageDimensions);
    };
  }, []);

  return (
    <div className="w-full max-md:max-w-md md:max-w-6xl mx-auto">
      <div className="relative">
        <Image
          ref={imageRef}
          src="/images/base.webp"
          alt="Room"
          className="relative w-full h-auto border"
          width={1240}
          height={873}
          priority
        />

        {points.map((point) => (
          <div
            key={point.id}
            className="absolute"
            style={{
              top: (point.coordY * imageDimensions.height) / 100,
              left: (point.coordX * imageDimensions.width) / 100,
              zIndex: 10,
            }}
            onClick={() => {
              setSelectedPoint(point.id);
            }}
          >
            <Image
              src="/icons/fingerprintIcon.svg"
              alt="Fingerprint Icon"
              width={20}
              height={20}
              className="p-1 cursor-pointer border-2 bg-[#475569] border-[#475569] opacity-50 rounded-full sm:h-[25px] sm:w-[25px] md:h-[40px] md:w-[40px] ring-2 ring-white ring-inset" // Para mostrar el cursor como puntero al pasar por encima
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomConfigurator;
