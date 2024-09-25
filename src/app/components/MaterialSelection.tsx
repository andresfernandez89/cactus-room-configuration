import Image from "next/image";
import { IMaterialSelectionProps } from "../types/firestore";

const MaterialSelection = ({
  materials,
  selectedMaterial,
  onMaterialChange,
}: IMaterialSelectionProps) => {
  return (
    <section className="py-4 md:pl-4 flex flex-col md:mt-4">
      {materials.map((material) => (
        <div
          key={material.name}
          onClick={() => onMaterialChange(material)}
          className="flex items-center cursor-pointer py-1 rounded transition-all hover:bg-primary/5"
        >
          <div className="relative h-12 w-12 rounded md:h-[100px] md:w-[100px]">
            <Image
              src={material.materialPreview}
              alt={material.name}
              height={48}
              width={48}
              className="rounded-l p-[2px] bg-[#f8fafc] h-full w-auto min-w-[48px] md:min-w-[100px]"
            />
          </div>
          {selectedMaterial?.name === material.name && (
            <p className="text-sm p-3 font-medium content-center justify-center items-center text-center transition-all bg-[#f8fafc] h-12 md:h-[100px] rounded-r text-black">
              {material.name}
            </p>
          )}
        </div>
      ))}
    </section>
  );
};

export default MaterialSelection;
