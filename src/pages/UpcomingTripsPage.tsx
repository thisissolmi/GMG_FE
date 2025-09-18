"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./UpcomingTripsPage.module.css";

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
    itinerary: {
        day: number;
        places: string[];
    }[];
}

export default function UpcomingTripsPage() {
    const router = useRouter();

    // 예정된 여행 데이터
    const [trips, setTrips] = useState<TripData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 백엔드에서 여행 목록을 가져오는 함수
    const fetchTrips = async () => {
        try {
            setIsLoading(true);
            setError(null);

            // 토큰 확인
            const response = await fetch('/api/trips/me/planned', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('API 응답 상태:', response.status, response.statusText);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('API 에러 응답:', errorText);
                throw new Error(`여행 목록을 불러오는데 실패했습니다. (${response.status}: ${response.statusText})`);
            }

            const tripListResponses: TripListResponse[] = await response.json();

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
                itinerary: Object.entries(trip.dayContents).map(([day, places]) => ({
                    day: parseInt(day),
                    places: places
                })).sort((a, b) => a.day - b.day)
            }));

            setTrips(convertedTrips);

        } catch (error) {
            console.error('여행 목록 조회 오류:', error);
            setError(error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.');

            // 에러 발생 시 메인 페이지로 리다이렉트
            setTimeout(() => {
                router.push('/');
            }, 2000); // 2초 후 리다이렉트
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

        router.push(`/UpcomingTripDetailPage?${queryParams.toString()}`);
    };

    // 로딩 상태 렌더링
    if (isLoading) {
        return (
            <div className={`${styles.container} w-full md:pl-[14.25rem] md:pr-[14.1875rem] m-0`}>
                <div className={`${styles.header} md:pt-[2.5rem] md:pb-[1.875rem]`}>
                    <h1 className={styles.title}>예정된 여행</h1>
                </div>
                <div className={styles.loadingContainer}>
                    <div className={styles.loadingText}>여행 목록을 불러오는 중...</div>
                </div>
            </div>
        );
    }

    // 에러 상태 렌더링
    if (error) {
        return (
            <div className={`${styles.container} w-full md:pl-[14.25rem] md:pr-[14.1875rem] m-0`}>
                <div className={`${styles.header} md:pt-[2.5rem] md:pb-[1.875rem]`}>
                    <h1 className={styles.title}>예정된 여행</h1>
                </div>
                <div className={styles.errorContainer}>
                    <div className={styles.errorText}>{error}</div>
                    <button className={styles.retryButton} onClick={fetchTrips}>
                        다시 시도
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={`${styles.container} w-full md:pl-[14.25rem] md:pr-[14.1875rem] m-0`}>
            <div className={`${styles.header} md:pt-[2.5rem] md:pb-[1.875rem]`}>
                <h1 className={styles.title}>예정된 여행</h1>
            </div>

            <div className={`${styles.tripsList} md:pl-[1.75rem] md:pr-[1.44rem]`}>
                {trips.length === 0 ? (
                    <div className={styles.emptyContainer}>
                        <div className={styles.emptyText}>예정된 여행이 없습니다.</div>
                        <div className={styles.emptySubText}>새로운 여행을 계획해보세요!</div>
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