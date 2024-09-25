"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Material, useMaterials } from "../hooks/useMaterials";
import usePoints from "../hooks/usePoints";

const RoomConfigurator = () => {
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);
  const points = usePoints();
  const materials = useMaterials(selectedPoint);
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(
    null,
  );
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [showPoints, setShowPoints] = useState(true);

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

  useEffect(() => {
    if (selectedPoint) {
      const material = materials[0];
      if (material) {
        handleMaterialChange(material);
      }
    }
  }, [selectedPoint, materials]);

  const handleMaterialChange = useCallback(
    (material: Material) => {
      if (selectedPoint && material.layers[selectedPoint]) {
        const layerUrl = material.layers[selectedPoint];
        setSelectedLayer(layerUrl);
        setSelectedMaterial((prevMaterial) =>
          prevMaterial?.name === material.name ? null : material,
        );
        setShowPoints(false);
      }
    },
    [selectedPoint],
  );

  const handleImageClick = () => {
    setShowPoints(true);
    setSelectedMaterial(null);
    setSelectedLayer(null);
  };

  return (
    <div className="w-full max-md:max-w-md md:max-w-7xl mx-auto md:grid md:grid-cols-6">
      <div className="relative md:col-span-5" onClick={handleImageClick}>
        <Image
          ref={imageRef}
          src="/images/base.webp"
          alt="Room"
          className="relative w-full h-auto"
          width={1240}
          height={873}
          priority
        />

        {selectedLayer && (
          <Image
            src={selectedLayer}
            alt="Selected Material"
            className="absolute top-0 left-0"
            style={{ width: "100%", height: "100%" }}
            width={1240}
            height={873}
            priority
          />
        )}

        {showPoints &&
          points.map((point) => (
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
                setShowPoints(false);
              }}
            >
              <Image
                src="/icons/fingerprintIcon.svg"
                alt="Fingerprint Icon"
                width={20}
                height={20}
                className="p-1 cursor-pointer border-2 bg-[#475569] border-[#475569] opacity-50 rounded-full sm:h-[25px] sm:w-[25px] md:h-[40px] md:w-[40px] ring-2 ring-white ring-inset"
              />
            </div>
          ))}
      </div>

      {materials.length > 0 && (
        <section className="py-4 pl-4 flex flex-col md:mt-4">
          {materials.map((material) => (
            <div
              key={material.name}
              onClick={() => handleMaterialChange(material)}
              className="flex items-center cursor-pointer py-1 rounded transition-all hover:bg-primary/5"
            >
              <div
                className={`relative h-12 w-12 rounded md:h-[100px] md:w-[100px]`}
              >
                <Image
                  src={material.materialPreview}
                  alt={material.name}
                  height={48}
                  width={48}
                  className="rounded-l p-[2px] bg-white h-full w-auto md:min-w-[100px]"
                />
              </div>
              {selectedMaterial?.name === material.name && (
                <p className="text-sm p-3 font-medium content-center justify-center items-center text-center transition-all bg-white h-12 md:h-[100px] rounded-r text-black">
                  {material.name}
                </p>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default RoomConfigurator;
