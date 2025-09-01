import React from "react";

type SelectAreaProps = {
  selected: string[];
  onSelect: (area: string) => void;
};

const AREAS = [
  "서울특별시", "부산광역시", "대구광역시", "인천광역시",
  "광주광역시", "대전광역시", "울산광역시", "세종특별자치시",
  "경기도", "강원특별자치도", "충청북도", "충청남도",
  "전북특별자치도", "전라남도", "경상북도", "경상남도",
  "제주특별자치도", "전체 선택",
];

export default function SelectArea({ selected, onSelect }: SelectAreaProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 w-full">
      {AREAS.map((area) => {
        const isActive = selected.includes(area);
        return (
          <button
            key={area}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(area)}
            className={[
              "h-10 w-full select-none rounded-md border text-sm font-medium",
              "transition shadow-sm text-center",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-yellow-400",
              isActive
                ? "bg-yellow-400 border-yellow-500 text-white"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100"
            ].join(" ")}
          >
            {area}
          </button>
        );
      })}
    </div>
  );
}
