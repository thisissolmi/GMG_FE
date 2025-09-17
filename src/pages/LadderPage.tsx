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

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function LadderPage() {
  const router = useRouter();
  const [items, setItems] = useState<string[]>([]);
  const [result, setResult] = useState<string[]>([]);

  useEffect(() => {
    if (!router.isReady) return;
    const list = parseAreas(router.query.areas);
    setItems(list);
    setResult(list.length ? shuffle(list) : []);
  }, [router.isReady, router.query.areas]);

  const canPlay = items.length >= 2;

  const reshuffle = () => setResult(shuffle(items));

  return (
    <main className="min-h-screen w-full bg-yellow-400 flex items-center justify-center p-6">
      <section className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-6">
        <header className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">사다리 타기 🪜</h1>
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

        <p className="text-sm text-gray-600 mb-4">
          대상(지역): {items.length ? items.join(", ") : "없음"}
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
            <div className="overflow-x-auto">
              <table className="w-full text-left border border-gray-200 rounded-xl overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-gray-700 font-semibold">번호</th>
                    <th className="px-4 py-2 text-gray-700 font-semibold">입력(지역)</th>
                    <th className="px-4 py-2 text-gray-700 font-semibold">결과(매칭)</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((area, i) => (
                    <tr key={area} className="border-t">
                      <td className="px-4 py-2 text-gray-500">{i + 1}</td>
                      <td className="px-4 py-2">{area}</td>
                      <td className="px-4 py-2 font-medium">{result[i]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={reshuffle}
                className="rounded-full px-5 h-11 bg-yellow-400 text-white font-semibold shadow hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-yellow-400"
              >
                다시 섞기 🔄
              </button>
              <span className="text-sm text-gray-500">셔플할 때마다 매칭이 바뀝니다.</span>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
