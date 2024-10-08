export type PointTypes = {
  id: string;
  coordX: number;
  coordY: number;
  name: string;
};

export type MaterialTypes = {
  layers: Record<string, string>;
  materialPreview: string;
  name: string;
  points: string[];
  layerUrl: string;
};

export interface IMaterialSelectionProps {
  materials: MaterialTypes[];
  selectedMaterial: MaterialTypes | null;
  onMaterialChange: (material: MaterialTypes) => void;
}
