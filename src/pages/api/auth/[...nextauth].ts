// src/pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/LoginPage",   // 🔐 로그인 화면 (이미 파일 있으면 OK)
    error: "/auth/error",   // ❗ 에러 UI (우리가 보여줄 페이지 경로)
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // 보안 + 의도대로 리다이렉트 🚦
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      try {
        const u = new URL(url);
        if (u.origin === baseUrl) return url;
      } catch {}
      return `${baseUrl}/MainPage`; // 기본 목적지
    },
  },
  debug: true,
});
