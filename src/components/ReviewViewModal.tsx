import React from 'react';
import styles from './ReviewViewModal.module.css';

interface ReviewViewModalProps {
    isOpen: boolean;
    onClose: () => void;
    tripTitle?: string;
    tripLocation?: string;
    placeRating?: number;
    reviewContent?: string;
    reviewDate?: string;
    userName?: string;
}

export default function ReviewViewModal({ 
    isOpen, 
    onClose, 
    tripTitle, 
    tripLocation, 
    placeRating = 0, 
    reviewContent = "", 
    reviewDate = "",
    userName = ""
}: ReviewViewModalProps) {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <div className={styles.headerContent}>
                        <div className={styles.tripInfo}>
                            <span className={styles.tripName}>{tripTitle || "여행이름1"}</span>
                            <div className={styles.separator}></div>
                            <span className={styles.tripLocation}>{tripLocation || "서울특별시 용산구"}</span>
                        </div>
                        <div className={styles.ratingSection}>
                            <div className={styles.ratingStars}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <div
                                        key={star}
                                        className={`${styles.headerStar} ${star <= placeRating ? styles.headerStarActive : ''}`}
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
                            <div className={styles.reviewInfo}>
                                <span className={styles.userName}>{userName || "사용자"}</span>
                                <span className={styles.reviewDate}>{reviewDate || "2024.01.01"}</span>
                            </div>
                            <div className={styles.reviewContent}>
                                {reviewContent || "작성된 후기가 없습니다."}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.modalFooter}>
                    <button className={styles.closeButton} onClick={onClose}>
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
}
