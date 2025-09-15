"use client";

import styles from "./Step3Card.module.css";
import Image from 'next/image';

// import { useState } from "react";

interface Step3CardProps {
    onPrev?: () => void;
    onNext?: () => void;
    tripStyle: string;
    setTripStyle: (style: string) => void;
}

export default function Step3Card({ onPrev, onNext, tripStyle, setTripStyle }: Step3CardProps) {
    
    const handleNext = () => {
        if (tripStyle.trim() === "") {
            alert("여행 스타일을 선택해주세요.");
        } else {
            onNext?.();
        }
    };

    return (
        <div className={styles.container}>
            <p className={styles.title}>STEP 3.</p>
            <div className={styles.descriptionContainer}>
                <p className={styles.description}>어디로 여행하시나요?</p>
            </div>
            
            <div className={styles.buttonContainer}>
                <button 
                    className={`${styles.button} ${tripStyle === 'current' ? styles.selected : ''}`}
                    onClick={() => setTripStyle('current')}
                >
                    현재 위치로 보기
                </button>
                <button 
                    className={`${styles.button} ${tripStyle === 'select' ? styles.selected : ''}`}
                    onClick={() => setTripStyle('select')}
                >
                    지역 선택하기
                </button>
                <button 
                    className={`${styles.button} ${tripStyle === 'random' ? styles.selected : ''}`}
                    onClick={() => setTripStyle('random')}
                >
                    랜덤 추천 받기
                </button>
            </div>
            
            <div className={styles.imgContainer}> 
                <Image
                src="/leftArrow.svg"
                alt="leftArrow"
                onClick={onPrev}
                width={24}
                height={24}
                />
                <Image
                src="/rightArrow.svg"
                alt="arrowRight"
                onClick={handleNext}
                width={24}
                height={24}
                />
            </div>
        </div>
    );
}