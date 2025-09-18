"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./PastTripsPage.module.css";

// 백엔드 API 응답 타입 정의
interface TripListResponse {
    tripId: number;
    title: string;
    days: number;
    totalContents: number;
    createdAt: string;
    updatedAt: string;
    dayContents: { [key: number]: string[] };
}

// 프론트엔드에서 사용하는 여행 데이터 타입 정의
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
    const [trips, setTrips] = useState<TripData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    // 예시 데이터 생성 함수
    const createSampleTrips = (): TripData[] => {
        return [
            {
                id: 1,
                title: "서울 2박 3일 여행",
                destination: "서울",
                date: "2024년 1월 15일",
                rating: 4.8,
                itinerary: [
                    {
                        day: 1,
                        places: ["경복궁", "남산타워"]
                    },
                    {
                        day: 2,
                        places: ["명동", "홍대"]
                    },
                    {
                        day: 3,
                        places: ["강남역"]
                    }
                ]
            },
            {
                id: 2,
                title: "부산 바다 여행",
                destination: "부산",
                date: "2024년 2월 10일",
                rating: 4.6,
                itinerary: [
                    {
                        day: 1,
                        places: ["해운대해수욕장", "감천문화마을"]
                    },
                    {
                        day: 2,
                        places: ["부산타워"]
                    }
                ]
            },
            {
                id: 3,
                title: "제주도 힐링 여행",
                destination: "제주도",
                date: "2024년 3월 5일",
                rating: 4.9,
                itinerary: [
                    {
                        day: 1,
                        places: ["성산일출봉"]
                    },
                    {
                        day: 2,
                        places: ["한라산"]
                    },
                    {
                        day: 3,
                        places: ["제주올레"]
                    },
                    {
                        day: 4,
                        places: ["성산일출봉"]
                    }
                ]
            },
            {
                id: 4,
                title: "경주 역사 여행",
                destination: "경주",
                date: "2024년 3월 20일",
                rating: 4.7,
                itinerary: [
                    {
                        day: 1,
                        places: ["불국사", "석굴암"]
                    },
                    {
                        day: 2,
                        places: ["경주월드"]
                    }
                ]
            },
            {
                id: 5,
                title: "서울 맛집 투어",
                destination: "서울",
                date: "2024년 4월 1일",
                rating: 4.5,
                itinerary: [
                    {
                        day: 1,
                        places: ["명동", "홍대", "강남역"]
                    }
                ]
            },
            {
                id: 6,
                title: "부산 감천문화마을 탐방",
                destination: "부산",
                date: "2024년 4월 15일",
                rating: 4.4,
                itinerary: [
                    {
                        day: 1,
                        places: ["감천문화마을"]
                    }
                ]
            }
        ];
    };

    // 백엔드에서 다녀온 여행 목록을 가져오는 함수
    const fetchTrips = async () => {
        try {
            setIsLoading(true);
            setError(null);
            
            const response = await fetch('/api/trips/me/completed', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            console.log('API 응답 상태:', response.status, response.statusText);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('API 에러 응답:', errorText);
                throw new Error(`다녀온 여행 목록을 불러오는데 실패했습니다. (${response.status}: ${response.statusText})`);
            }
            
            const tripListResponses: TripListResponse[] = await response.json();
            
            // 현재 데이터가 없으므로 임시로 예시 데이터 사용
            if (tripListResponses.length === 0) {
                console.log('현재 완료된 여행 데이터가 없어 예시 데이터를 사용합니다.');
                const sampleTrips = createSampleTrips();
                setTrips(sampleTrips);
            } else {
                // 백엔드 응답을 프론트엔드 형식으로 변환
                const convertedTrips: TripData[] = tripListResponses.map(trip => ({
                    id: trip.tripId,
                    title: trip.title,
                    destination: "서울", // TODO: 백엔드에서 destination 정보 추가 필요
                    date: new Date(trip.createdAt).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }),
                    rating: 4.5, // TODO: 백엔드에서 실제 평점 데이터 가져오기
                    itinerary: Object.entries(trip.dayContents).map(([day, places]) => ({
                        day: parseInt(day),
                        places: places
                    })).sort((a, b) => a.day - b.day)
                }));
                
                setTrips(convertedTrips);
            }
            
        } catch (error) {
            console.error('다녀온 여행 목록 조회 오류:', error);
            console.log('API 호출 실패로 예시 데이터를 사용합니다.');
            
            // API 호출 실패 시 예시 데이터 사용
            const sampleTrips = createSampleTrips();
            setTrips(sampleTrips);
        } finally {
            setIsLoading(false);
        }
    };
    
    // 컴포넌트 마운트 시 여행 목록 가져오기
    useEffect(() => {
        fetchTrips();
    }, []);

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

    // 로딩 상태 렌더링
    if (isLoading) {
        return (
            <div className={`${styles.container} w-full md:pl-[14.25rem] md:pr-[14.1875rem] m-0`}>
                <div className={`${styles.header} md:pt-[2.5rem] md:pb-[1.875rem]`}>
                    <h1 className={styles.title}>다녀온 여행</h1>
                </div>
                <div className={styles.loadingContainer}>
                    <div className={styles.loadingText}>다녀온 여행 목록을 불러오는 중...</div>
                </div>
            </div>
        );
    }

    // 에러 상태는 더 이상 표시하지 않음 (예시 데이터 사용)

    return (
        <div className={`${styles.container} w-full md:pl-[14.25rem] md:pr-[14.1875rem] m-0`}>
            <div className={`${styles.header} md:pt-[2.5rem] md:pb-[1.875rem]`}>
                <h1 className={styles.title}>다녀온 여행</h1>
            </div>
            
            <div className={`${styles.tripsList} md:pl-[1.75rem] md:pr-[1.44rem]`}>
                {trips.length === 0 ? (
                    <div className={styles.emptyContainer}>
                        <div className={styles.emptyText}>다녀온 여행이 없습니다.</div>
                        <div className={styles.emptySubText}>새로운 여행을 계획해보세요!</div>
                        <button 
                            className={styles.createTripButton}
                            onClick={() => router.push('/CreateSchedulePage')}
                        >
                            여행 계획하기
                        </button>
                    </div>
                ) : (
                    trips.map((trip) => (
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
                                {trip.itinerary.length >= 3 ? (
                                    // 3일 이상일 때는 Day 1, Day 2만 표시하고 나머지는 more.svg로 대체
                                    <>
                                        {trip.itinerary.slice(0, 2).map((day, index) => (
                                            <div key={index} className={styles.dayItinerary}>
                                                <div className={styles.dayLabel}>Day {day.day}</div>
                                                <div className={styles.places}>
                                                    {day.places.join(" - ")}
                                                </div>
                                            </div>
                                        ))}
                                        <div className={styles.moreIndicator}>
                                            <img src="/more.svg" alt="더보기" width="2.5" height="12" />
                                        </div>
                                    </>
                                ) : (
                                    // 2일 이하일 때는 모든 일정 표시
                                    trip.itinerary.map((day, index) => (
                                        <div key={index} className={styles.dayItinerary}>
                                            <div className={styles.dayLabel}>Day {day.day}</div>
                                            <div className={styles.places}>
                                                {day.places.join(" - ")}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                            
                            <div className={styles.arrowButton}>
                                <img 
                                    src="/rightArrow.svg" 
                                    alt="화살표" 
                                    style={{
                                        width: '12px',
                                        height: '6px',
                                        strokeWidth: '1.5px',
                                        stroke: '#B3B3B3'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    ))
                )}
            </div>
        </div>
    );
}

