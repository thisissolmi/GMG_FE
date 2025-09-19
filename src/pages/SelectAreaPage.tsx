"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SelectArea from "@/components/SelectArea";

export default function SelectAreaPage() {
    const router = useRouter();
    const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

    const handleAreaSelect = (area: string) => {
        if (area === "전체 선택") {
            setSelectedAreas(selectedAreas.length === 17 ? [] : [
                "서울특별시", "부산광역시", "대구광역시", "인천광역시",
                "광주광역시", "대전광역시", "울산광역시", "세종특별자치시",
                "경기도", "강원특별자치도", "충청북도", "충청남도",
                "전북특별자치도", "전라남도", "경상북도", "경상남도",
                "제주특별자치도"
            ]);
        } else {
            setSelectedAreas(prev => 
                prev.includes(area) 
                    ? prev.filter(a => a !== area)
                    : [...prev, area]
            );
        }
    };

    const handleNext = () => {
        if (selectedAreas.length === 0) {
            alert("최소 하나의 지역을 선택해주세요.");
            return;
        }
        
        // 선택된 지역들을 쿼리 파라미터로 GameMode 페이지로 이동
        const areasParam = selectedAreas.map(area => encodeURIComponent(area)).join(",");
        router.push(`/GameMode?areas=${areasParam}`);
    };

    return (
        <main className="min-h-screen w-full bg-yellow-400/90 flex items-center justify-center p-6">
            <section className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-6">
                <header className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-extrabold text-yellow-500 tracking-tight">지역 선택</h1>
                    <button 
                        onClick={() => router.push('/CreateSchedulePage')} 
                        className="rounded-full bg-gray-100 px-4 h-10 text-gray-700 font-medium shadow hover:shadow-md"
                    >
                        ← 이전 단계
                    </button>
                </header>

                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-4">여행하고 싶은 지역을 선택하세요</h2>
                    <p className="text-sm text-gray-600 mb-4">
                        선택된 지역: {selectedAreas.length}개
                    </p>
                    <SelectArea selected={selectedAreas} onSelect={handleAreaSelect} />
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={handleNext}
                        disabled={selectedAreas.length === 0}
                        className="px-6 py-3 bg-yellow-400 text-white font-semibold rounded-lg shadow hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        다음 단계로 ({selectedAreas.length}개 지역 선택됨)
                    </button>
                </div>
            </section>
        </main>
    );
}
