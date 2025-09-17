"use client";
import { useState } from "react";
import styles from "./ReviewWriteModal.module.css";

interface ReviewWriteModalProps {
    isOpen: boolean;
    onClose: () => void;
    tripTitle?: string;
}

export default function ReviewWriteModal({ isOpen, onClose, tripTitle }: ReviewWriteModalProps) {
    const [content, setContent] = useState("");
    const [placeRating, setPlaceRating] = useState(0);

    const handleSubmit = () => {
        // TODO: 실제 후기 등록 로직 구현
        console.log("후기 등록:", { content, placeRating });
        onClose();
    };

    const handlePlaceStarClick = (starRating: number) => {
        setPlaceRating(starRating);
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <div className={styles.headerContent}>
                        <div className={styles.tripInfo}>
                            <span className={styles.tripName}>{tripTitle || "여행이름1"}</span>
                            <div className={styles.separator}></div>
                            <span className={styles.tripLocation}>서울특별시 용산구</span>
                        </div>
                        <div className={styles.ratingSection}>
                            <div className={styles.ratingStars}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <div 
                                        key={star} 
                                        className={`${styles.headerStar} ${star <= placeRating ? styles.headerStarActive : ''}`}
                                        onClick={() => handlePlaceStarClick(star)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <button className={styles.modalCloseButton} onClick={onClose}>
                        ×
                    </button>
                </div>
                <div className={styles.modalBody}>
                    <div className={styles.reviewForm}>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>여행 기록</label>
                            <textarea 
                                className={styles.formTextarea}
                                placeholder="여행 경험을 자유롭게 작성해주세요"
                                rows={16}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.modalFooter}>
                    <button className={styles.submitButton} onClick={handleSubmit}>
                        여행 기록 남기기
                    </button>
                </div>
            </div>
        </div>
    );
}
