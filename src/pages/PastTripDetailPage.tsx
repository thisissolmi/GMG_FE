"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./PastTripDetailPage.module.css";
import useKakaoLoader from "@/components/UseKaKaoLoader";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import { 
    calculateCenter, 
    convertToMapPlaces, 
    getMarkerImage, 
    type Place 
} from "@/utils/mapUtils";
import ReviewWriteModal from "@/components/ReviewWriteModal";
import ReviewViewModal from "@/components/ReviewViewModal";
import { getCurrentPosition, calculateDistanceToPlace } from "@/utils/geolocation";
import { getSampleTripData, type TripDetailData } from "@/data/sampleTripData";

// 백엔드 API 응답 타입 정의
interface TripDetailResponse {
    tripId: number;
    title: string;
    days: number;
    user: {
        userId: number;
        email: string;
        name: string;
    };
    createdAt: string;
    updatedAt: string;
    tripContents: {
        day: number;
        contents: {
            tripContentId: number;
            sequence: number;
            content: {
                contentId: string;
                title: string;
                addr: string;
                tel: string;
                zipcode: string;
                firstImage: string;
                firstImage2: string;
                contentTypeId: string;
                areaCode: string;
                sigunguCode: string;
                mapX: string;
                mapY: string;
            };
        }[];
    }[];
}

// TripDetailData는 sampleTripData.ts에서 import

export default function PastTripDetailPage() {
    const searchParams = useSearchParams();
    const [selectedDay, setSelectedDay] = useState(1);
    const [tripData, setTripData] = useState<TripDetailData | null>(null);
    const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
    const [draggedItem, setDraggedItem] = useState<number | null>(null);
    const [clickedMarker, setClickedMarker] = useState<number | null>(null);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [isReviewViewModalOpen, setIsReviewViewModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);

    useKakaoLoader();

    // 현재 위치를 가져오는 함수
    const getCurrentLocation = async () => {
        try {
            const position = await getCurrentPosition();
            setCurrentLocation({
                lat: position.latitude,
                lng: position.longitude
            });
        } catch (error) {
            console.warn('현재 위치를 가져올 수 없습니다:', error);
        }
    };


    // 백엔드에서 여행 상세 정보를 가져오는 함수
    const fetchTripDetail = async (tripId: number) => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await fetch(`/api/trips/me/planned/${tripId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`여행 상세 정보를 불러오는데 실패했습니다. (${response.status}: ${response.statusText})`);
            }

            const tripDetailResponse: TripDetailResponse = await response.json();

            // 백엔드 응답을 프론트엔드 형식으로 변환
            const convertedTripData: TripDetailData = {
                id: tripDetailResponse.tripId,
                title: tripDetailResponse.title,
                destination: "서울", // TODO: 백엔드에서 destination 정보 추가 필요
                date: new Date(tripDetailResponse.createdAt).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }),
                days: tripDetailResponse.tripContents.map(dayContent => ({
                    day: dayContent.day,
                    items: dayContent.contents.map((tripContent, index) => ({
                        id: tripContent.tripContentId,
                        type: index === 0 ? 'departure' as const : 'place' as const,
                        name: tripContent.content.title,
                        lat: parseFloat(tripContent.content.mapY) || 37.5665,
                        lng: parseFloat(tripContent.content.mapX) || 126.9780,
                        mapX: tripContent.content.mapX,
                        mapY: tripContent.content.mapY,
                        image: tripContent.content.firstImage || tripContent.content.firstImage2 || undefined,
                        description: tripContent.content.addr || `${tripContent.content.title}에 대한 설명입니다.`,
                        tel: tripContent.content.tel || undefined,
                        reviews: 859
                    }))
                })).sort((a, b) => a.day - b.day)
            };

            setTripData(convertedTripData);

        } catch (error) {
            console.error('여행 상세 정보 조회 오류:', error);
            console.log('API 호출 실패로 예시 데이터를 사용합니다.');
            
            // API 호출 실패 시 예시 데이터 사용
            const sampleTripData = getSampleTripData(tripId);
            setTripData(sampleTripData);
        } finally {
            setIsLoading(false);
        }
    };

    // 마커 클릭 핸들러
    const handleMarkerClick = (placeId: number) => {
        setClickedMarker(clickedMarker === placeId ? null : placeId);
    };

    // 오버레이 닫기 함수
    const closeOverlay = () => {
        setClickedMarker(null);
    };

    // 거리 계산 함수
    const calculateItemDistance = (item: any): string => {
        if (!currentLocation) {
            return '내 위치에서 143m'; // 기본값
        }
        
        // 백엔드에서 받은 원본 데이터에서 mapX, mapY 사용
        const placeMapX = item.mapX || item.lng;
        const placeMapY = item.mapY || item.lat;
        
        if (!placeMapX || !placeMapY) {
            return '내 위치에서 143m'; // 기본값
        }
        
        try {
            return calculateDistanceToPlace(
                currentLocation.lat,
                currentLocation.lng,
                placeMapX,
                placeMapY
            );
        } catch (error) {
            console.warn('거리 계산 실패:', error);
            return '내 위치에서 143m'; // 기본값
        }
    };

    // 모달 열기/닫기 함수
    const openReviewModal = () => {
        setIsReviewModalOpen(true);
    };

    const closeReviewModal = () => {
        setIsReviewModalOpen(false);
    };

    // 후기 보기 모달 핸들러
    const openReviewViewModal = () => {
        setIsReviewViewModalOpen(true);
    };

    const closeReviewViewModal = () => {
        setIsReviewViewModalOpen(false);
    };

    // 아이템 확장/축소 토글 함수
    const toggleItemExpansion = (itemId: number) => {
        setExpandedItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(itemId)) {
                newSet.delete(itemId);
            } else {
                newSet.add(itemId);
            }
            return newSet;
        });
    };

    // 드래그 시작
    const handleDragStart = (e: React.DragEvent, itemId: number) => {
        setDraggedItem(itemId);
        e.dataTransfer.effectAllowed = 'move';
    };

    // 드래그 오버
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    // 드롭
    const handleDrop = (e: React.DragEvent, targetItemId: number) => {
        e.preventDefault();

        if (!draggedItem || draggedItem === targetItemId || !tripData) {
            return;
        }

        const currentDayData = tripData.days.find(day => day.day === selectedDay);
        if (!currentDayData) return;

        const items = [...currentDayData.items];
        const draggedIndex = items.findIndex(item => item.id === draggedItem);
        const targetIndex = items.findIndex(item => item.id === targetItemId);

        if (draggedIndex === -1 || targetIndex === -1) return;

        // 아이템 순서 변경
        const draggedItemData = items[draggedIndex];
        items.splice(draggedIndex, 1);
        items.splice(targetIndex, 0, draggedItemData);

        // tripData 업데이트
        setTripData(prev => {
            if (!prev) return null;
            return {
                ...prev,
                days: prev.days.map(day =>
                    day.day === selectedDay
                        ? { ...day, items }
                        : day
                )
            };
        });

        setDraggedItem(null);
    };

    // 드래그 종료
    const handleDragEnd = () => {
        setDraggedItem(null);
    };

    // URL 쿼리 파라미터에서 여행 ID 받아서 API 호출
    useEffect(() => {
        const id = searchParams.get('id');

        if (id) {
            fetchTripDetail(parseInt(id));
        } else {
            console.error('여행 ID가 누락되었습니다.');
            setError('여행 ID가 필요합니다.');
            setIsLoading(false);
        }
    }, [searchParams]);

    // 컴포넌트 마운트 시 현재 위치 가져오기
    useEffect(() => {
        getCurrentLocation();
    }, []);

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

    // 현재 선택된 날짜의 장소들을 지도용 데이터로 변환
    const mapPlaces: Place[] = convertToMapPlaces(currentDayData?.items || []);

    // 지도 중심점 계산
    const mapCenter = calculateCenter(mapPlaces);

    // 디버깅: 마커 좌표 확인
    console.log('Map Places:', mapPlaces);

    return (

        <div className={`${styles.container} w-full md:pl-[4rem] md:pr-[4rem] mt-7`}>
            {/* 날짜별 일정 요약 정보 */}
            <div className={`${styles.summaryContainer}`}>
                <div className={`${styles.titleContainer}`}>
                    <h1>다녀온 여행</h1>
                </div>
                <div className={`${styles.travelPlanHeaderContainer}`}>
                    <div className={`${styles.travelHeaderInfoContainer}`}>
                        <div className={`${styles.travelName}`}>{tripData.title}</div>
                        <div className={`${styles.strokeSeparator}`}></div>
                        <div className={`${styles.travelDestination}`}>{tripData.destination}</div>
                    </div>
                    <div className={styles.reviewButtons}>
                        <button className={`${styles.reviewWriteButton}`} onClick={openReviewModal}>여행 후기 작성</button>
                        <button className={`${styles.reviewViewButton}`} onClick={openReviewViewModal}>후기 보기</button>
                    </div>
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
                            <div
                                key={item.id}
                                className={styles.itineraryItem}
                                draggable={item.type !== 'departure'}
                                onDragStart={(e) => item.type !== 'departure' && handleDragStart(e, item.id)}
                                onDragOver={handleDragOver}
                                onDrop={(e) => item.type !== 'departure' && handleDrop(e, item.id)}
                                onDragEnd={handleDragEnd}
                                style={{
                                    opacity: draggedItem === item.id ? 0.5 : 1,
                                    cursor: item.type !== 'departure' ? 'move' : 'default'
                                }}
                            >
                                {item.type === 'departure' ? (
                                    <div className={styles.departureLabel}>출발</div>
                                ) : (
                                    <div className={styles.reorderIcon}>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M2 4h12M2 8h12M2 12h12" stroke="#999" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                )}

                                <div className={styles.itemContent}>
                                    <div className={styles.placeItem}>
                                        <div className={styles.placeDetails}>
                                            <h3 className={styles.placeName}>{item.name}</h3>
                                        </div>
                                    </div>

                                    {/* 출발지와 관광지 모두에 대한 확장된 세부 정보 */}
                                    {expandedItems.has(item.id) && (
                                        <div className={styles.expandedDetails}>
                                            <div className={styles.expandedContent}>
                                                {item.image && (
                                                    <div className={styles.placeImage}>
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className={styles.placeImageContent}
                                                        />
                                                    </div>
                                                )}
                                                <div className={styles.detailsText}>
                                                    <div className={styles.statusAndDistance}>
                                                        {item.tel && (
                                                            <div className={styles.tel}>{item.tel}</div>
                                                        )}
                                                        <div className={styles.distance}>
                                                            내 위치에서 {calculateItemDistance(item)}
                                                        </div>
                                                    </div>
                                                    <div className={styles.reviewsAndDescription}>
                                                        {item.reviews && (
                                                            <div className={styles.reviews}>후기 {item.reviews}</div>
                                                        )}
                                                        {item.description && (
                                                            <div className={styles.description}>{item.description}</div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>


                                <div
                                    className={styles.expandIcon}
                                    onClick={() => toggleItemExpansion(item.id)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {expandedItems.has(item.id) ? (
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M4 10L8 6L12 10" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    ) : (
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M6 4L10 8L6 12" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                </div>


                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.mapSection}>
                <Map
                    id="map"
                    center={mapCenter}
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                    level={7}
                    onClick={closeOverlay}
                >
                    {/* 장소 마커들과 커스텀 오버레이 */}
                    {mapPlaces.map((place, index) => (
                        <div key={place.id}>
                            {/* 클릭 가능한 마커 */}
                            <MapMarker
                                position={{ lat: place.lat, lng: place.lng }}
                                title={place.name}
                                image={getMarkerImage(place.type)}
                                onClick={() => handleMarkerClick(place.id)}
                            />
                            
                            {/* 클릭 시 표시되는 오버레이 */}
                            {clickedMarker === place.id && (
                                <CustomOverlayMap
                                    position={{ lat: place.lat, lng: place.lng }}
                                    yAnchor={1}
                                >
                                    <div 
                                        className={styles.clickableOverlay}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className={styles.wrap}>
                                            <div className={styles.info}>
                                                <div className={styles.title}>
                                                    {index + 1}번째 {place.name}
                                                    <div 
                                                        className={styles.close} 
                                                        onClick={closeOverlay}
                                                        title="닫기"
                                                    />
                                                </div>
                                                <div className={styles.body}>
                                                    <div className={styles.img}>
                                                        <img 
                                                            src={place.image || "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/thumnail.png"} 
                                                            width="73" 
                                                            height="70"
                                                            alt={place.name}
                                                        />
                                                    </div>
                                                    <div className={styles.desc}>
                                                        <div className={styles.ellipsis}>
                                                            {place.description || "관광지 정보"}
                                                        </div>
                                                        <div className={styles.jibun}>
                                                            {place.lat.toFixed(6)}, {place.lng.toFixed(6)}
                                                        </div>
                                                        <div>
                                                            <a 
                                                                href={`https://map.kakao.com/link/map/${place.name},${place.lat},${place.lng}`}
                                                                target="_blank" 
                                                                rel="noopener noreferrer"
                                                                className={styles.link}
                                                            >
                                                                카카오맵에서 보기
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CustomOverlayMap>
                            )}
                        </div>
                    ))}
                </Map>
            </div>

            {/* 여행 후기 작성 모달 */}
            <ReviewWriteModal 
                isOpen={isReviewModalOpen}
                onClose={closeReviewModal}
                tripTitle={tripData?.title}
                tripId={tripData?.id}
                places={tripData?.days.flatMap(day => day.items.filter(item => item.type === 'place')).map(item => ({
                    id: item.id,
                    name: item.name,
                    type: item.type,
                    contentId: item.contentId
                })) || []}
            />

            {/* 여행 후기 보기 모달 */}
            <ReviewViewModal 
                isOpen={isReviewViewModalOpen}
                onClose={closeReviewViewModal}
                tripTitle={tripData?.title}
                places={tripData?.days.flatMap(day => day.items.filter(item => item.type === 'place')).map(item => ({
                    id: item.id,
                    name: item.name,
                    type: item.type,
                    contentId: item.contentId
                })) || []}
            />
        </div>
    );
}

