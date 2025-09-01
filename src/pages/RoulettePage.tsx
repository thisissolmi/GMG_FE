import { useRouter } from "next/router";
import { useMemo, useState } from "react";

const SIZE = 360;
const R = SIZE / 2;
const toRad = (deg: number) => (deg - 90) * Math.PI / 180;
const polar = (cx:number,cy:number,r:number,a:number)=>({ x:cx+r*Math.cos(toRad(a)), y:cy+r*Math.sin(toRad(a)) });
const arc = (cx:number,cy:number,r:number,s:number,e:number)=>{
  const sPt = polar(cx,cy,r,e), ePt = polar(cx,cy,r,s);
  const large = e - s <= 180 ? "0" : "1";
  return `M ${cx} ${cy} L ${sPt.x} ${sPt.y} A ${r} ${r} 0 ${large} 0 ${ePt.x} ${ePt.y} Z`;
};

export default function RoulettePage() {
  const router = useRouter();
  const areasParam = (router.query.areas as string) || "";

  const items = useMemo(
    () => areasParam.split(",").map((s) => decodeURIComponent(s).trim()).filter(Boolean),
    [areasParam]
  );

  const [deg, setDeg] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  const slice = 360 / Math.max(items.length, 1);
  const colors = useMemo(() => items.map((_, i) => (i % 2 ? "#f59e0b" : "#fde047")), [items]); // amber / yellow

  const spin = () => {
    if (!items.length || spinning) return;
    const idx = Math.floor(Math.random() * items.length);
    const target = 360 - (idx * slice + slice / 2);  
    setSpinning(true);
    setDeg(5 * 360 + target); 
    setTimeout(() => {
      setSpinning(false);
      setWinner(items[idx]);
    }, 4200);
  };

  return (
    <main className="min-h-screen w-full bg-yellow-400 flex items-center justify-center p-6">
      <section className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-6">
        <header className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">룰렛 돌리기 🎡</h1>
          <button
            onClick={() => router.push(`/GameMode?areas=${encodeURIComponent(items.join(","))}`)}
            className="rounded-full bg-gray-100 px-4 h-10 text-gray-700 font-medium shadow hover:shadow-md"
          >
            ← 방식 다시 선택
          </button>
        </header>

        <p className="text-sm text-gray-600 mb-4">
          대상(지역): {items.length ? items.join(", ") : "없음"}
        </p>

        {!items.length ? (
          <div className="rounded-xl border border-dashed border-gray-300 p-6 text-center text-gray-500">
            선택된 지역이 없습니다. <br />
            <button
                onClick={() => router.push("/RegionSelect")}
              className="mt-3 rounded-full bg-yellow-400 px-4 h-10 text-white font-semibold shadow hover:brightness-95"
            >
              지역 선택하러 가기 →
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="absolute left-1/2 -translate-x-1/2 -top-4 pointer-events-none">
                <div className="h-0 w-0 border-l-8 border-r-8 border-b-[16px] border-l-transparent border-r-transparent border-b-black/70 drop-shadow-md" />
              </div>

              <div
                className="h-[360px] w-[360px] rounded-full border-[10px] border-yellow-400 shadow-2xl"
                style={{ transition: "transform 4s cubic-bezier(0.12,0.6,0.08,1)", transform: `rotate(${deg}deg)` }}
              >
                <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className="rounded-full">
                  {items.map((label, i) => {
                    const start = i * slice, end = (i + 1) * slice, mid = start + slice / 2;
                    const text = polar(R, R, R * 0.65, mid);
                    return (
                      <g key={i}>
                        <path d={arc(R, R, R - 10, start, end)} fill={colors[i]} stroke="#fff" strokeWidth="1" />
                        <text
                          x={text.x}
                          y={text.y}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize="12"
                          fill="#1f2937"
                          transform={`rotate(${mid}, ${text.x}, ${text.y})`}
                        >
                          {label.length > 7 ? `${label.slice(0, 7)}…` : label}
                        </text>
                      </g>
                    );
                  })}
                </svg>
                <button
                  onClick={spin}
                  disabled={spinning}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 rounded-full bg-yellow-400 text-white font-bold shadow-md enabled:hover:brightness-95 enabled:active:scale-95 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-yellow-400"
                >
                  START
                </button>
              </div>
            </div>

            <div className="text-center text-gray-700 min-h-6">
              {winner ? <>🎉 선택된 지역: <span className="font-semibold">{winner}</span></> : "START를 눌러 돌려보세요"}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
