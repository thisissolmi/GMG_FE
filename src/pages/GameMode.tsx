import { useRouter } from "next/router";
import { useMemo } from "react";

export default function GameMode() {
  const router = useRouter();
  const areasParam = (router.query.areas as string) || "";
  const items = useMemo(() => areasParam.split(",").map(decodeURIComponent).filter(Boolean), [areasParam]);

 const go = (path: "/LadderPage" | "/DicePage" | "/RoulettePage") => {
  if (!items.length) return router.push("/RegionSelect");
  router.push(`${path}?areas=${areasParam}`);
};


  return (
    <main className="min-h-screen w-full bg-yellow-400/90 flex items-center justify-center p-6">
      <section className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-6">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-extrabold text-yellow-500 tracking-tight">즉행</h1>
          <button onClick={() => router.push("/regionselect")} className="rounded-full bg-gray-100 px-4 h-10 text-gray-700 font-medium shadow hover:shadow-md">
            ← 지역 다시 선택
          </button>
        </header>

        <div className="mb-4 text-sm text-gray-600">
          선택한 지역: {items.length ? <span className="font-medium">{items.join(", ")}</span> : <span className="text-gray-400">없음</span>}
        </div>

        <h2 className="text-lg font-semibold mb-4">2단계: 게임 방식을 선택하세요</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button onClick={() => go("/LadderPage")}   disabled={!items.length} className="group rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm hover:shadow-md disabled:opacity-50">
            <div className="flex items-center gap-3"><span className="text-3xl">🪜</span><div><div className="text-lg font-semibold">사다리 타기</div><p className="text-sm text-gray-600">랜덤 매칭</p></div></div>
            <div className="mt-4 text-yellow-600 font-medium">선택하기 →</div>
          </button>

          <button onClick={() => go("/DicePage")}     disabled={!items.length} className="group rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm hover:shadow-md disabled:opacity-50">
            <div className="flex items-center gap-3"><span className="text-3xl">🎲</span><div><div className="text-lg font-semibold">주사위 굴리기</div><p className="text-sm text-gray-600">주사위 결과로 선택</p></div></div>
            <div className="mt-4 text-yellow-600 font-medium">선택하기 →</div>
          </button>

 
          <button onClick={() => go("/RoulettePage")} 
 disabled={!items.length} className="group rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm hover:shadow-md disabled:opacity-50">
            <div className="flex items-center gap-3"><span className="text-3xl">🎯</span><div><div className="text-lg font-semibold">룰렛 돌리기</div><p className="text-sm text-gray-600">원형 룰렛에서 랜덤</p></div></div>
            <div className="mt-4 text-yellow-600 font-medium">바로 시작 →</div>
          </button>
        </div>
      </section>
    </main>
  );
}
