// import "@/styles/globals.css";
// import type { AppProps } from "next/app";
// import Header from "@/components/Header";
// import Script from "next/script";
// import { useState, useEffect } from "react";

// export default function App({ Component, pageProps }: AppProps) {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // 로그인 상태 체크 (예시)
//   useEffect(() => {
//     // 실제 프로젝트에서는 토큰이나 인증 상태를 확인
//     // const token = localStorage.getItem("token");
//     // if (token) {
//     //   setIsLoggedIn(true);
//     // }

//     // 테스트를 위해 기본값을 false로 설정 (로그인되지 않은 상태)
//     setIsLoggedIn(false);
//   }, []);

//   return (
//     <>
//       <div className="grid grid-rows-[auto_1fr] min-h-screen">
//       <Script
//           src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services,clusterer&autoload=false`}
//           strategy="beforeInteractive"
//         />
//         <Header isLoggedIn={isLoggedIn} />
//         <main>
//           <Component {...pageProps} />
//         </main>
//       </div>
//     </>
//   );
// }


// // // pages/_app.tsx
// // import type { AppProps } from 'next/app';
// // import { SessionProvider } from 'next-auth/react';
// // import AuthSync from '@/components/AuthSync';
// // import '@/styles/globals.css';

// // export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
// //   return (
// //     <SessionProvider session={session}>
// //       <AuthSync />
// //       <Component {...pageProps} />
// //     </SessionProvider>
// //   );
// // }


// src/pages/_app.tsx
import { useRouter } from "next/router"; // ✅ next/router
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import type { Session } from 'next-auth';
import '../styles/globals.css'; // 경로 확인 필요

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}