"use client";

import styles from "./Step1Card.module.css";
import { useState } from "react";

interface Step1CardProps {
    onNext?: () => void;
    tripName: string;
    setTripName: (name: string) => void;
}

export default function Step1Card({ onNext, tripName, setTripName }: Step1CardProps) {

    const handleNext = () => {
        if (tripName.trim() === "") {
            alert("여행 이름을 입력해주세요.");
        } else {
            onNext?.();
        }
    };
    return (
        <div className={styles.container}>
            <p className={styles.title}>STEP 1.</p>
            <div className={styles.descriptionContainer}>
                <p className={styles.description}>여행 이름을 정해보세요.</p>
            </div>
            <div className={styles.inputContainer}>
                <input
                    className={styles.input}
                    onChange={(e) => setTripName(e.target.value)}
                    type="text"
                    placeholder="0813 여행 1"
                    value={tripName}
                />
            </div>
            <div className={styles.imgContainer}>
                <img
                    src="/rightArrow.svg"
                    alt="arrowRight"
                    onClick={handleNext}
                    style={{ cursor: 'pointer' }}
                />
            </div>
        </div>
    );
}