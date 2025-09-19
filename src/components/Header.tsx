"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";

interface HeaderProps {
  isLoggedIn?: boolean;
}

// 네비게이션 상단 헤더 컴포넌트
const Header: React.FC<HeaderProps> = ({ isLoggedIn = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 현재는 로그인된 상태의 헤더만 렌더링
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* 좌측 로고 */}
        <div className={styles.logoContainer}>
          <img
  src="/yellologo.png"
  alt="즉행 로고"
  className="w-15 h-15"
/>
        </div>

        {/* 우측 아이콘들 */}
        <div className={styles.iconContainer}>
          {/* 사용자 아이콘 */}
          <button type="button" className={styles.iconButton} aria-label="사용자">
            <img
              src="/Union.svg"
              alt="사용자 아이콘"
              className={styles.userIcon}
            />
          </button>

          {/* 햄버거 메뉴 */}
          <button
            type="button"
            className={styles.iconButton}
            aria-label="메뉴 열기"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <img
              src="/Vector.svg"
              alt="메뉴 아이콘"
              className={styles.menuIcon}
            />
          </button>
        </div>
      </div>

      {/* 드롭다운 메뉴 */}
      {isMenuOpen && (
        <div className={styles.dropdown}>
          <nav className={styles.nav} aria-label="주요 메뉴">
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