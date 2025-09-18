import React, { useState, useEffect } from 'react';
import styles from './ReviewViewModal.module.css';

interface Review {
    reviewId: number;
    contentId: string;
    contentTitle: string;
    score: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
}

interface ContentReviewsResponse {
    averageScore: number | null;
    reviewCount: number;
    reviews: Review[];
}

interface Place {
    id: number;
    name: string;
    type: 'departure' | 'place';
    contentId?: string;
}

interface ReviewViewModalProps {
    isOpen: boolean;
    onClose: () => void;
    tripTitle?: string;
    places?: Place[];
}

export default function ReviewViewModal({ 
    isOpen, 
    onClose, 
    tripTitle, 
    places = []
}: ReviewViewModalProps) {
    const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [averageScore, setAverageScore] = useState<number | null>(null);
    const [reviewCount, setReviewCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // API에서 리뷰 데이터 가져오기
    const fetchReviews = async (contentId: string) => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await fetch(`/api/contents/${contentId}/reviews?page=0&size=10`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`리뷰를 불러오는데 실패했습니다. (${response.status}: ${response.statusText})`);
            }

            const data: ContentReviewsResponse = await response.json();
            setReviews(data.reviews);
            setAverageScore(data.averageScore);
            setReviewCount(data.reviewCount);

        } catch (error) {
            console.error('리뷰 조회 오류:', error);
            setError('리뷰를 불러오는데 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    // 관광지 선택 핸들러
    const handlePlaceSelect = (place: Place) => {
        setSelectedPlace(place);
        if (place.contentId) {
            fetchReviews(place.contentId);
        }
    };

    // 모달이 열릴 때 첫 번째 관광지 선택
    useEffect(() => {
        if (isOpen && places.length > 0) {
            const firstPlace = places.find(place => place.contentId);
            if (firstPlace) {
                setSelectedPlace(firstPlace);
                fetchReviews(firstPlace.contentId!);
            }
        }
    }, [isOpen, places]);

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <div className={styles.headerContent}>
                        <div className={styles.tripInfo}>
                            <span className={styles.tripName}>{tripTitle || "여행 후기"}</span>
                            <div className={styles.separator}></div>
                            <span className={styles.tripLocation}>
                                {averageScore ? `평균 ${averageScore.toFixed(1)}점` : "평점 없음"} 
                                ({reviewCount}개 리뷰)
                            </span>
                        </div>
                        <div className={styles.ratingSection}>
                            <div className={styles.ratingStars}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <div
                                        key={star}
                                        className={`${styles.headerStar} ${averageScore && star <= Math.round(averageScore) ? styles.headerStarActive : ''}`}
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
                    {/* 관광지 탭 */}
                    {places.length > 0 && (
                        <div className={styles.placeTabs}>
                            {places.map((place) => (
                                <button
                                    key={place.id}
                                    className={`${styles.placeTab} ${selectedPlace?.id === place.id ? styles.placeTabActive : ''}`}
                                    onClick={() => handlePlaceSelect(place)}
                                >
                                    {place.name}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* 리뷰 내용 */}
                    {isLoading ? (
                        <div className={styles.loadingContainer}>
                            <div className={styles.loadingText}>리뷰를 불러오는 중...</div>
                        </div>
                    ) : error ? (
                        <div className={styles.errorContainer}>
                            <div className={styles.errorText}>{error}</div>
                        </div>
                    ) : reviews.length === 0 ? (
                        <div className={styles.emptyContainer}>
                            <div className={styles.emptyText}>
                                {selectedPlace ? `${selectedPlace.name}에 대한 후기가 없습니다.` : '작성된 후기가 없습니다.'}
                            </div>
                        </div>
                    ) : (
                        <div className={styles.reviewsList}>
                            {reviews.map((review) => (
                                <div key={review.reviewId} className={styles.reviewItem}>
                                    <div className={styles.reviewHeader}>
                                        <div className={styles.reviewInfo}>
                                            <span className={styles.contentTitle}>{review.contentTitle}</span>
                                            <span className={styles.reviewDate}>
                                                {new Date(review.createdAt).toLocaleDateString('ko-KR')}
                                            </span>
                                        </div>
                                        <div className={styles.reviewRating}>
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <div
                                                    key={star}
                                                    className={`${styles.reviewStar} ${star <= review.score ? styles.reviewStarActive : ''}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div className={styles.reviewContent}>
                                        {review.comment}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
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
