"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./PastTripsPage.module.css";

// 여행 데이터 타입 정의
interface TripData {
    id: number;
    title: string;
    destination: string;
    date: string;
    rating: number;
    itinerary: {
        day: number;
        places: string[];
    }[];
}

export default function PastTripsPage() {
    const router = useRouter();
    
    // 다녀온 여행 데이터
    const [trips] = useState<TripData[]>([
        {
            id: 1,
            title: "여행이름1",
            destination: "서울특별시 용산구",
            date: "2025. 8. 13.",
            rating: 4.5,
            itinerary: [
                {
                    day: 1,
                    places: ["서울역", "리키커피숍", "덕수궁", "통인시장", "롯데시티호텔 명동"]
                },
                {
                    day: 2,
                    places: ["창덕궁", "혜화극장", "효성주얼리시티쇼핑몰", "롯데시티호텔 명동"]
                }
            ]
        },
        {
            id: 2,
            title: "여행이름2",
            destination: "서울특별시 서대문구",
            date: "2025. 8. 25.",
            rating: 4.5,
            itinerary: [
                {
                    day: 1,
                    places: ["서울역", "리키커피숍", "덕수궁", "통인시장", "롯데시티호텔 명동"]
                },
                {
                    day: 2,
                    places: ["창덕궁", "혜화극장", "효성주얼리시티쇼핑몰", "롯데시티호텔 명동"]
                }
            ]
        },
        {
            id: 3,
            title: "여행이름3",
            destination: "경북 포항시 북구",
            date: "2025. 9. 3.",
            rating: 4.5,
            itinerary: [
                {
                    day: 1,
                    places: ["서울역", "리키커피숍", "덕수궁", "통인시장", "롯데시티호텔 명동"]
                },
                {
                    day: 2,
                    places: ["창덕궁", "혜화극장", "효성주얼리시티쇼핑몰", "롯데시티호텔 명동"]
                }
            ]
        }
    ]);

    // 여행 카드 클릭 핸들러
    const handleTripClick = (trip: TripData) => {
        // URL 쿼리 파라미터로 여행 데이터 전달
        const queryParams = new URLSearchParams({
            id: trip.id.toString(),
            title: trip.title,
            destination: trip.destination,
            date: trip.date
        });
        
        router.push(`/PastTripDetailPage?${queryParams.toString()}`);
    };

    return (
        <div className={`${styles.container} w-full md:pl-[14.25rem] md:pr-[14.1875rem] m-0`}>
            <div className={`${styles.header} md:pt-[2.5rem] md:pb-[1.875rem]`}>
                <h1 className={styles.title}>다녀온 여행</h1>
            </div>
            
            <div className={`${styles.tripsList} md:pl-[1.75rem] md:pr-[1.44rem]`}>
                {trips.map((trip) => (
                    <div 
                        key={trip.id} 
                        className={`${styles.tripCard} md:pt-[2rem] md:pb-[1.64rem]`}
                        onClick={() => handleTripClick(trip)}
                    >
                        <div className={`${styles.tripHeader} mb-[15px] gap-[15px]`}>
                            <div className={styles.tripTitle}>{trip.title}</div>
                            <div className={styles.tripDestination}>{trip.destination}</div>
                            <div className={styles.ratingContainer}>
                                <img src="/star.svg" alt="star" className={styles.starIcon} />
                                <span className={styles.rating}>{trip.rating}</span>
                                <svg className={styles.ratingArrow} width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M6 12L10 8L6 4" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <div className={styles.tripDate}>{trip.date}</div>
                        </div>
                        
                        <div className={styles.tripContent}>
                            <div className={styles.itinerary}>
                                {trip.itinerary.map((day, index) => (
                                    <div key={index} className={styles.dayItinerary}>
                                        <div className={styles.dayLabel}>Day {day.day}</div>
                                        <div className={styles.places}>
                                            {day.places.join(" - ")}
                                        </div>
                                    </div>
                                ))}
                                {trip.itinerary.length > 2 && (
                                    <div className={styles.moreIndicator}>...</div>
                                )}
                            </div>
                            
                            <div className={styles.arrowButton}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M6 12L10 8L6 4" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

