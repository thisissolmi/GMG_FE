import React, { useState } from "react";
import SelectArea from "../components/SelectArea";


export default function GameSetting() {
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

  const handleSelect = (area: string) => {
    if (area === "전체 선택") {
      setSelectedAreas(
        selectedAreas.length === 17 ? [] : ["전체 선택", ...selectedAreas]
      );
      return;
    }

    setSelectedAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  };

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h2 className="text-xl font-semibold mb-4">
        게임에 포함할 지역을 선택하세요
      </h2>
      <SelectArea selected={selectedAreas} onSelect={handleSelect} />
      <div className="mt-4 text-gray-600">
        선택된 지역: {selectedAreas.join(", ") || "없음"}
      </div>
    </div>
  );
}
