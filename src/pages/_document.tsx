import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        {/* SEO 메타 태그 */}
        <meta name="description" content="GMG 관광 여행 계획 서비스" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="GMG, 즉행, 여행계획, 관광, 여행, 서울여행, 일정관리" />
        
        {/* Open Graph 메타 태그 */}
        <meta property="og:title" content="GMG 즉행 - 여행 계획 서비스" />
        <meta property="og:description" content="쉽고 빠른 여행 계획을 세워보세요" />
        <meta property="og:image" content="/GMG_LOGO.png" />
        <meta property="og:url" content="https://gmg-travel.com" />
        <meta property="og:type" content="website" />

        {/* Twitter Card 메타 태그 */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="GMG 즉행 - 여행 계획 서비스" />
        <meta name="twitter:description" content="쉽고 빠른 여행 계획을 세워보세요" />
        <meta name="twitter:image" content="/GMG_LOGO.png" />

        {/* 보안 헤더 */}
        <meta httpEquiv="Cross-Origin-Opener-Policy" content="same-origin" />
        <meta httpEquiv="Cross-Origin-Embedder-Policy" content="require-corp" />
        
        {/* 파비콘 */}
        <link rel="icon" href="/GMG_LOGO.png" />
        
        {/* Pretendard 폰트 preload */}
        <link 
          rel="preload" 
          href="/fonts/Pretendard-Regular.otf" 
          as="font" 
          type="font/otf" 
          crossOrigin="" 
        />
        <link 
          rel="preload" 
          href="/fonts/Pretendard-Medium.otf" 
          as="font" 
          type="font/otf" 
          crossOrigin="" 
        />
        <link 
          rel="preload" 
          href="/fonts/Pretendard-SemiBold.otf" 
          as="font" 
          type="font/otf" 
          crossOrigin="" 
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
