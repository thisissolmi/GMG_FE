"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./PastTripDetailPage.module.css";

// 여행 상세 데이터 타입 정의
interface TripDetailData {
    id: number;
    title: string;
    destination: string;
    date: string;
    days: {
        day: number;
        items: {
            id: number;
            type: 'departure' | 'place';
            name: string;
            time?: string;
            status?: string;
            distance?: string;
            reviews?: number;
            image?: string;
            description?: string;
        }[];
    }[];
}

export default function PastTripDetailPage() {
    const searchParams = useSearchParams();
    const [selectedDay, setSelectedDay] = useState(1);
    const [tripData, setTripData] = useState<TripDetailData | null>(null);

    // URL 쿼리 파라미터에서 여행 정보 받기
    useEffect(() => {
        const id = searchParams.get('id');
        const title = searchParams.get('title');
        const destination = searchParams.get('destination');
        const date = searchParams.get('date');

        if (id && title && destination && date) {
            // 실제 프로젝트에서는 API 호출로 상세 데이터 가져오기
            const tripDetailData: TripDetailData = {
                id: parseInt(id),
                title: decodeURIComponent(title),
                destination: decodeURIComponent(destination),
                date: decodeURIComponent(date),
                days: getTripDetailDays(parseInt(id)) // ID에 따른 상세 일정 데이터
            };

            setTripData(tripDetailData);
        } else {
            console.error('필수 파라미터가 누락되었습니다:', { id, title, destination, date });
        }
    }, [searchParams]);

    // ID에 따른 상세 일정 데이터 반환 (실제로는 API에서 가져옴)
    const getTripDetailDays = (tripId: number) => {

        const tripDetailsMap: { [key: number]: any[] } = {
            1: [
                {
                    day: 1,
                    items: [
                        {
                            id: 1,
                            type: 'departure',
                            name: '출발 서울역',
                            time: '09:00'
                        },
                        {
                            id: 2,
                            type: 'place',
                            name: '리키커피숍',
                            time: '10:00',
                            status: '영업 중',
                            distance: '내 위치에서 143m',
                            reviews: 859,
                            image: '/cafe-image.jpg',
                            description: '주소 전화번호 등 정보 어디까지 넣을 수 있는지용?'
                        },
                        {
                            id: 3,
                            type: 'place',
                            name: '덕수궁',
                            time: '11:00'
                        },
                        {
                            id: 4,
                            type: 'place',
                            name: '덕수궁',
                            time: '12:00'
                        },
                        {
                            id: 5,
                            type: 'place',
                            name: '덕수궁',
                            time: '13:00'
                        },
                        {
                            id: 6,
                            type: 'place',
                            name: '통인시장',
                            time: '14:00'
                        }
                    ]
                },
                {
                    day: 2,
                    items: [
                        {
                            id: 7,
                            type: 'departure',
                            name: '출발 호텔',
                            time: '09:00'
                        },
                        {
                            id: 8,
                            type: 'place',
                            name: '창덕궁',
                            time: '10:00'
                        },
                        {
                            id: 9,
                            type: 'place',
                            name: '혜화극장',
                            time: '14:00'
                        }
                    ]
                },
                {
                    day: 3,
                    items: [
                        {
                            id: 10,
                            type: 'departure',
                            name: '출발 호텔',
                            time: '09:00'
                        },
                        {
                            id: 11,
                            type: 'place',
                            name: '남산타워',
                            time: '10:00'
                        }
                    ]
                },
                {
                    day: 4,
                    items: [
                        {
                            id: 12,
                            type: 'departure',
                            name: '출발 호텔',
                            time: '09:00'
                        },
                        {
                            id: 13,
                            type: 'place',
                            name: '명동',
                            time: '10:00'
                        }
                    ]
                }
            ]
        };

        const result = tripDetailsMap[tripId] || [];
        return result;
    };

    // 로딩 상태 처리
    if (!tripData) {
        return (
            <div className={`${styles.container} w-full h-screen md:pl-[14.25rem] md:pr-[14.1875rem] m-0`}>
                <div className="flex items-center justify-center h-full">
                    <div className="text-lg text-gray-600">로딩 중...</div>
                </div>
            </div>
        );
    }

    const currentDayData = tripData.days.find(day => day.day === selectedDay);

    return (

        <div className={`${styles.container} w-full md:pl-[4rem] md:pr-[4rem] mt-7`}>
            {/* 날짜별 일정 요약 정보 */}
            <div className={`${styles.summaryContainer}`}>
                <div className={`${styles.titleContainer}`}>
                    <h1>일정 요약</h1>
                </div>
                <div className={`${styles.travelPlanHeaderContainer}`}>
                    <div className={`${styles.travelHeaderInfoContainer}`}>
                        <div className={`${styles.travelName}`}>{tripData.title}</div>
                        <div className={`${styles.strokeSeparator}`}></div>
                        <div className={`${styles.travelDestination}`}>{tripData.destination}</div>
                    </div>
                    <button className={`${styles.editButton}`}>일정 수정하기</button>
                </div>

                <div className={`${styles.summaryContentContainer}`}>
                    {/* Day 탭 */}
                    <div className={styles.dayTabs}>
                        {tripData.days.map((day) => (
                            <button
                                key={day.day}
                                className={`${styles.dayTab} ${selectedDay === day.day ? styles.active : ''}`}
                                onClick={() => {
                                    setSelectedDay(day.day);
                                }}
                            >
                                Day {day.day}
                            </button>
                        ))}
                    </div>

                    {/* 일정 아이템들 */}
                    <div className={styles.itineraryItems}>
                        {currentDayData?.items.map((item) => (
                            <div key={item.id} className={styles.itineraryItem}>
                                <div className={styles.reorderIcon}>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M2 4h12M2 8h12M2 12h12" stroke="#999" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                </div>
                                
                                <div className={styles.itemContent}>
                                    {item.type === 'departure' ? (
                                        <div className={styles.departureItem}>
                                            <span className={styles.departureLabel}>출발</span>
                                            <span className={styles.departureName}>{item.name}</span>
                                        </div>
                                    ) : (
                                        <div className={styles.placeItem}>
                                            <div className={styles.placeImage}>
                                                <div className={styles.imagePlaceholder}>
                                                    📍
                                                </div>
                                            </div>
                                            <div className={styles.placeDetails}>
                                                <h3 className={styles.placeName}>{item.name}</h3>
                                                {item.status && (
                                                    <div className={styles.placeStatus}>
                                                        <span className={styles.status}>{item.status}</span>
                                                        {item.time && <span className={styles.time}>{item.time} 까지</span>}
                                                    </div>
                                                )}
                                                {item.distance && (
                                                    <div className={styles.distance}>{item.distance}</div>
                                                )}
                                                {item.reviews && (
                                                    <div className={styles.reviews}>후기 {item.reviews}</div>
                                                )}
                                                {item.description && (
                                                    <div className={styles.description}>{item.description}</div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className={styles.expandIcon}>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M6 4L10 8L6 12" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
