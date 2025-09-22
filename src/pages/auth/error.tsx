// src/pages/auth/error.tsx  ← 페이지 라우트(클라이언트)
import { useRouter } from "next/router";

export default function AuthErrorPage() {
  const { query } = useRouter();
  const code = (query.error as string) ?? "unknown";

  return (
    <main style={{ padding: 24 }}>
      <h1>로그인 오류 😵</h1>
      <p>에러 코드: <b>{code}</b></p>
      <a href="/api/auth/signin">다시 로그인</a>
    </main>
  );
}
