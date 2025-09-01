"use client";
import React, { useState } from "react";
import { useRouter } from "next/router";
import SelectArea from "@/components/SelectArea";

export default function RegionSelect() {
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();

  const toggleSelect = (area: string) => {
    if (area === "전체 선택") {
      setSelected((prev) =>
        prev.length
          ? []
          : [
              "서울특별시","부산광역시","대구광역시","인천광역시",
              "광주광역시","대전광역시","울산광역시","세종특별자치시",
              "경기도","강원특별자치도","충청북도","충청남도",
              "전북특별자치도","전라남도","경상북도","경상남도","제주특별자치도",
            ]
      );
      return;
    }
    setSelected((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  };

  const goNext = () => {
    if (selected.length < 2) {
      alert("지역을 두 개 이상 선택해 주세요!");
      return;
    }
    const q = selected.map(encodeURIComponent).join(",");
    router.push(`/GameMode?areas=${q}`); 
  };

  return (
    <main className="min-h-screen w-full bg-yellow-400 flex items-center justify-center p-6">
      <section className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6 relative">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-white shadow-md border text-yellow-500 font-extrabold tracking-widest">
          즉행
        </div>

        <header className="mb-4">
          <h1 className="text-lg font-bold text-gray-900">게임에 포함할 지역을 선택하세요.</h1>
        </header>

        <SelectArea selected={selected} onSelect={toggleSelect} />

        <footer className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            선택한 지역: <span className="font-semibold">{selected.length}</span>개
          </p>

          <button
            type="button"
            onClick={goNext}
            disabled={selected.length < 2}
            className={`rounded-full px-4 h-10 font-semibold shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition ${
              selected.length < 2
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-yellow-400 text-white hover:brightness-95 focus-visible:ring-yellow-400"
            }`}
          >
            다음 →
          </button>
        </footer>
      </section>
    </main>
  );
}
