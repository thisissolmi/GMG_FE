"use client";

import styles from "./Step2Card.module.css";
import Image from 'next/image';


interface Step2CardProps {
    onNext?: () => void;
    onPrev?: () => void;
    tripDays: string;
    setTripDays: (days: string) => void;
}

export default function Step2Card({ onNext, onPrev, tripDays, setTripDays }: Step2CardProps) {
    // 여행 일수 옵션들 (1일~10일)
    const dayOptions = Array.from({ length: 10 }, (_, i) => `${i + 1}일`);

    const handleNext = () => {
        if (tripDays.trim() === "") {
            alert("여행 일수를 입력해주세요.");
        } else {
            onNext?.();
        }
    };
    
    return (
        <div className={styles.container}>
            <p className={styles.title}>STEP 2.</p>
            <div className={styles.descriptionContainer}>
                <p className={styles.description}>며칠 동안 여행하시나요?</p>
            </div>

            <div className={styles.dropdownContainer}>
                <select
                    className={styles.dropdown}
                    value={tripDays}
                    onChange={(e) => setTripDays(e.target.value)}
                >
                    <option value="" disabled>여행 일수를 선택하세요</option>
                    {dayOptions.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
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