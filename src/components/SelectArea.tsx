import React from "react";

type SelectAreaProps = {
  selected: string[];
  onSelect: (area: string) => void;
};

const AREAS = [
  "서울특별시",
  "부산광역시",
  "대구광역시",
  "인천광역시",
  "광주광역시",
  "대전광역시",
  "울산광역시",
  "세종특별자치시",
  "경기도",
  "강원특별자치도",
  "충청북도",
  "충청남도",
  "전북특별자치도",
  "전라남도",
  "경상북도",
  "경상남도",
  "제주특별자치도",
  "전체 선택",
];

export default function SelectArea({ selected, onSelect }: SelectAreaProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center p-4">
      {AREAS.map((area) => {
        const isActive = selected.includes(area);
        return (
          <button
            key={area}
            onClick={() => onSelect(area)}
            className={`px-4 py-2 rounded-md border text-sm transition
              ${
                isActive
                  ? "bg-yellow-400 border-yellow-400 text-white font-bold"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
              }
            `}
          >
            {area}
          </button>
        );
      })}
    </div>
  );
}
