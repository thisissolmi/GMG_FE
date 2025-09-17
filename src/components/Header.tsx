"use client";

import { useState } from "react";
import Link from "next/link"; // ✅ Next.js 내부 라우팅
import styles from "./Header.module.css";

interface HeaderProps {
  isLoggedIn?: boolean;
}

// 네비게이션 상단 헤더 컴포넌트
const Header: React.FC<HeaderProps> = ({ isLoggedIn = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // // 로그인되지 않은 상태의 헤더
  // if (!isLoggedIn) {
  //   return (
  //     <header className={styles.headerLoggedOut}>
  //       <div className={styles.containerLoggedOut}>

  //         {/* 우측 로그인 버튼 */}
  //         <div className={styles.loginButtonContainer}>
  //           <a href="/LoginPage" className={styles.loginButton}>
  //             로그인
  //           </a>
  //         </div>
  //       </div>
  //     </header>
  //   );
  // }

  // 로그인된 상태의 헤더
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* 좌측 로고 */}
        <div className={styles.logoContainer}>
          <div className={styles.logo}>즉행</div>
        </div>

        {/* 우측 아이콘들 */}
        <div className={styles.iconContainer}>
          {/* 사용자 아이콘 */}
          <button type="button" className={styles.iconButton} aria-label="사용자">
            <svg
              className={styles.userIcon}
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </button>

          {/* 햄버거 메뉴 */}
          <button
            type="button"
            className={styles.iconButton}
            aria-label="메뉴 열기"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className={styles.menuIcon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* 드롭다운 메뉴 */}
      {isMenuOpen && (
        <div className={styles.dropdown}>
          <nav className={styles.nav} aria-label="주요 메뉴">
            {/* ⬇️ 전부 <Link>로 교체 */}
            <Link href="/schedule" className={styles.navLink}>
              일정 관리
            </Link>
            <Link href="/favorites" className={styles.navLink}>
              즐겨찾기
            </Link>
            <Link href="/history" className={styles.navLink}>
              여행 기록
            </Link>
            <Link href="/settings" className={styles.navLink}>
              설정
            </Link>
            <hr className={styles.divider} />
            {/* 로그아웃이 실제로 서버 액션/POST면 추후 버튼+액션으로 바꿔도 좋아요 */}
            <Link href="/logout" className={`${styles.navLink} ${styles.logout}`}>
              로그아웃
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
