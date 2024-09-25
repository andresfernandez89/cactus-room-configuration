"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Material } from "../hooks/useMaterials";
//import usePoints from "../hooks/usePoints";
//import useMaterials from "../hooks/useMaterials";

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
  const materials = [
    {
      name: "Blanco Núbol",
      materialPreview:
        "https://firebasestorage.googleapis.com/v0/b/visualizer-new-devs-test.appspot.com/o/materials_1566226732308_preview.jpeg?alt=media&token=20a9702b-652d-481d-96ee-91a214437150",
      points: ["Ks5CthbPwAvd2TNxzHEl"],
      layers: {
        Ks5CthbPwAvd2TNxzHEl:
          "https://firebasestorage.googleapis.com/v0/b/visualizer-new-devs-test.appspot.com/o/materials_1566226732308_KTQyQxRXM6se2nREr5zZ-1591364026128-Ks5CthbPwAvd2TNxzHEl.png?alt=media&token=82e826b0-8eb0-41ad-b23d-0f9ca0c8f963",
      },
      layerUrl:
        "https://firebasestorage.googleapis.com/v0/b/visualizer-new-devs-test.appspot.com/o/materials_1566226732308_KTQyQxRXM6se2nREr5zZ-1591364026128-Ks5CthbPwAvd2TNxzHEl.png?alt=media&token=82e826b0-8eb0-41ad-b23d-0f9ca0c8f963",
    },
    {
      name: "Roble Tierra",
      layers: {
        Ks5CthbPwAvd2TNxzHEl:
          "https://firebasestorage.googleapis.com/v0/b/visualizer-new-devs-test.appspot.com/o/materials_1563188186943_KTQyQxRXM6se2nREr5zZ-1591364026128-Ks5CthbPwAvd2TNxzHEl.png?alt=media&token=3a6562d6-916f-4fcf-a771-b28e450d2add",
      },
      materialPreview:
        "https://firebasestorage.googleapis.com/v0/b/visualizer-new-devs-test.appspot.com/o/materials_1563188186943_preview.jpeg?alt=media&token=f76c0914-2bfc-4055-9bc7-92a5a7b412bd",
      points: ["Ks5CthbPwAvd2TNxzHEl"],
      layerUrl:
        "https://firebasestorage.googleapis.com/v0/b/visualizer-new-devs-test.appspot.com/o/materials_1563188186943_KTQyQxRXM6se2nREr5zZ-1591364026128-Ks5CthbPwAvd2TNxzHEl.png?alt=media&token=3a6562d6-916f-4fcf-a771-b28e450d2add",
    },
    {
      materialPreview:
        "https://firebasestorage.googleapis.com/v0/b/visualizer-new-devs-test.appspot.com/o/materials_1578585661748_preview.jpeg?alt=media&token=69c30089-df31-444d-b6b4-ebe3bb19a7bc",
      name: "Etimoe Ice",
      points: ["Ks5CthbPwAvd2TNxzHEl"],
      layers: {
        Ks5CthbPwAvd2TNxzHEl:
          "https://firebasestorage.googleapis.com/v0/b/visualizer-new-devs-test.appspot.com/o/materials_1578585661748_KTQyQxRXM6se2nREr5zZ-1591364026128-Ks5CthbPwAvd2TNxzHEl.png?alt=media&token=062b38ee-990f-4d61-897e-444359f3cd75",
      },
      layerUrl:
        "https://firebasestorage.googleapis.com/v0/b/visualizer-new-devs-test.appspot.com/o/materials_1578585661748_KTQyQxRXM6se2nREr5zZ-1591364026128-Ks5CthbPwAvd2TNxzHEl.png?alt=media&token=062b38ee-990f-4d61-897e-444359f3cd75",
    },
  ];
  //const [selectedPoint, setSelectedPoint] = useState<string | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<string | null>(
    "Ks5CthbPwAvd2TNxzHEl",
  );
  //const points = usePoints(); // Hook para obtener los puntos
  //const materials = useMaterials(selectedPoint); // Hook para obtener los materiales
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(
    null,
  );
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

  useEffect(() => {
    if (selectedPoint) {
      const material = materials.find((m) => m.points.includes(selectedPoint));
      if (material) {
        handleMaterialChange(material);
      }
    }
  }, [selectedPoint]);

  const handleMaterialChange = (material: Material) => {
    console.log("Point:", selectedPoint);
    console.log("Material:", material);

    if (selectedPoint && material.layers[selectedPoint]) {
      const layerUrl = material.layers[selectedPoint];
      setSelectedLayer(layerUrl);
      setSelectedMaterial((prevMaterial) =>
        prevMaterial?.name === material.name ? null : material,
      );
    } else {
      console.error("No layer found for the selected point");
    }
  };
  return (
    <div className="w-full max-md:max-w-md md:max-w-7xl mx-auto md:grid md:grid-cols-6">
      <div className="relative md:col-span-5">
        <Image
          ref={imageRef}
          src="/images/base.webp"
          alt="Room"
          className="relative w-full h-auto border"
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
                  className="rounded-l p-[2px] bg-white h-full w-auto"
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
