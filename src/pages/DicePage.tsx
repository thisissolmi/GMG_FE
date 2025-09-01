import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function parseAreas(query: unknown): string[] {
  let raw = "";

  if (Array.isArray(query)) {
    raw = query.join(",");
  } else if (typeof query === "string") {
    raw = query;
  } else {
    raw = "";
  }

  return raw
    .split(",")
    .map((s: string) => decodeURIComponent(s).trim())
    .filter(Boolean);
}

export default function DicePage() {
  const router = useRouter();
  const [items, setItems] = useState<string[]>([]);
  const [rollIndex, setRollIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!router.isReady) return;
    setItems(parseAreas(router.query.areas));
  }, [router.isReady, router.query.areas]);

  const canPlay = items.length >= 2;
  const faces = items.length; // N면체

  const roll = () => {
    if (!canPlay) return;
    const i = Math.floor(Math.random() * items.length);
    setRollIndex(i);
  };

  const resultLabel = rollIndex !== null ? items[rollIndex] : null;

  return (
    <main className="min-h-screen w-full bg-yellow-400 flex items-center justify-center p-6">
      <section className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-6">
        <header className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">주사위 굴리기 🎲</h1>
          <div className="flex gap-2">
            <button
              onClick={() =>
                router.push(`/GameMode?areas=${encodeURIComponent(items.join(","))}`)
              }
              className="rounded-full bg-gray-100 px-4 h-10 text-gray-700 font-medium shadow hover:shadow-md"
            >
              ← 방식 다시 선택
            </button>
            <button
              onClick={() => router.push("/RegionSelect")}
              className="rounded-full bg-gray-100 px-4 h-10 text-gray-700 font-medium shadow hover:shadow-md"
            >
              지역 다시 선택
            </button>
          </div>
        </header>

        <p className="text-sm text-gray-600 mb-6">
          대상(지역): {items.length ? items.join(", ") : "없음"}{" "}
          {faces ? `(현재 ${faces}면체)` : ""}
        </p>

        {!canPlay ? (
          <div className="rounded-xl border border-dashed border-gray-300 p-6 text-center text-gray-500">
            최소 2개 이상의 지역이 필요합니다.
            <div className="mt-3">
              <button
                onClick={() => router.push("/RegionSelect")}
                className="rounded-full bg-yellow-400 px-4 h-10 text-white font-semibold shadow hover:brightness-95"
              >
                지역 선택하러 가기 →
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-4">
              <button
                onClick={roll}
                className="rounded-full px-5 h-11 bg-yellow-400 text-white font-semibold shadow hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-yellow-400"
              >
                굴리기
              </button>

              <div className="text-lg">
                {resultLabel ? (
                  <>
                    🎉 결과: <span className="font-semibold">
                      {rollIndex! + 1}번 — {resultLabel}
                    </span>
                  </>
                ) : (
                  "결과 대기…"
                )}
              </div>
            </div>

            {/* 번호-지역 테이블 */}
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-left border border-gray-200 rounded-xl overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-gray-700 font-semibold">번호</th>
                    <th className="px-4 py-2 text-gray-700 font-semibold">지역</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((area, i) => (
                    <tr key={area} className={`border-t ${rollIndex === i ? "bg-yellow-50" : ""}`}>
                      <td className="px-4 py-2 text-gray-500">{i + 1}</td>
                      <td className="px-4 py-2">{area}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
