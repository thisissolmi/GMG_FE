"use client";
import { useState, useEffect } from "react";
import styles from "./ReviewWriteModal.module.css";

interface Place {
    id: number;
    name: string;
    type: 'departure' | 'place';
    contentId?: string;
}

interface ReviewWriteModalProps {
    isOpen: boolean;
    onClose: () => void;
    tripTitle?: string;
    tripId?: number;
    places?: Place[];
}

export default function ReviewWriteModal({ isOpen, onClose, tripTitle, tripId, places = [] }: ReviewWriteModalProps) {
    const [content, setContent] = useState("");
    const [placeRating, setPlaceRating] = useState(0);
    const [selectedPlace, setSelectedPlace] = useState<number | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!tripId || selectedPlace === null) {
            alert("여행 ID와 관광지를 선택해주세요.");
            return;
        }

        const selectedPlaceData = places.find(p => p.id === selectedPlace);
        if (!selectedPlaceData?.contentId) {
            alert("선택한 관광지의 콘텐츠 ID가 없습니다.");
            return;
        }

        if (!content.trim()) {
            alert("여행 기록을 작성해주세요.");
            return;
        }

        try {
            setIsSubmitting(true);
            
            const response = await fetch(`/api/trips/${tripId}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contentId: selectedPlaceData.contentId,
                    score: placeRating,
                    comment: content.trim()
                })
            });

            if (!response.ok) {
                throw new Error(`리뷰 등록에 실패했습니다. (${response.status}: ${response.statusText})`);
            }

            const result = await response.json();
            console.log("리뷰 등록 성공:", result);
            
            alert("리뷰가 성공적으로 등록되었습니다.");
            onClose();
            
            // 폼 초기화
            setContent("");
            setPlaceRating(0);
            setSelectedPlace(null);
            
        } catch (error) {
            console.error("리뷰 등록 오류:", error);
            alert("리뷰 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePlaceStarClick = (starRating: number) => {
        setPlaceRating(starRating);
    };

    const handlePlaceSelect = (placeId: number) => {
        setSelectedPlace(placeId);
        setIsDropdownOpen(false);
    };

    const getSelectedPlaceName = () => {
        if (selectedPlace === null) {
            return places.length > 0 ? places[0].name : '관광지를 선택하세요';
        }
        const place = places.find(p => p.id === selectedPlace);
        return place ? place.name : '관광지를 선택하세요';
    };

    // 첫 번째 관광지를 기본으로 선택
    useEffect(() => {
        if (places.length > 0 && selectedPlace === null) {
            setSelectedPlace(places[0].id);
        }
    }, [places, selectedPlace]);

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
                            <label className={styles.formLabel}>후기 작성 대상</label>
                            <div className={styles.dropdownContainer}>
                                <button 
                                    className={styles.dropdownButton}
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                >
                                    <span>{getSelectedPlaceName()}</span>
                                    <img 
                                        src={isDropdownOpen ? "/arrowUp.svg" : "/arrowDown.svg"}
                                        alt={isDropdownOpen ? "닫기" : "열기"}
                                        className={styles.dropdownArrow}
                                    />
                                </button>
                                {isDropdownOpen && (
                                    <div className={styles.dropdownMenu}>
                                        {places.map((place) => (
                                            <div 
                                                key={place.id}
                                                className={`${styles.dropdownItem} ${selectedPlace === place.id ? styles.dropdownItemSelected : ''}`}
                                                onClick={() => handlePlaceSelect(place.id)}
                                            >
                                                {place.name}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>여행 기록</label>
                            <textarea 
                                className={styles.formTextarea}
                                placeholder="여행 경험을 자유롭게 작성해주세요"
                                rows={20}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.modalFooter}>
                    <button 
                        className={styles.submitButton} 
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "등록 중..." : "여행 기록 남기기"}
                    </button>
                </div>
            </div>
        </div>
    );
}
