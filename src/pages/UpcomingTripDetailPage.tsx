"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./UpcomingTripDetailPage.module.css";
import useKakaoLoader from "@/components/UseKaKaoLoader";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import { 
    calculateCenter, 
    convertToMapPlaces, 
    getMarkerImage, 
    type Place 
} from "@/utils/mapUtils";

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
            lat?: number;
            lng?: number;
        }[];
    }[];
}

export default function PastTripDetailPage() {
    const searchParams = useSearchParams();
    const [selectedDay, setSelectedDay] = useState(1);
    const [tripData, setTripData] = useState<TripDetailData | null>(null);
    const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
    const [draggedItem, setDraggedItem] = useState<number | null>(null);
    const [hoveredMarker, setHoveredMarker] = useState<number | null>(null);
    const [clickedMarker, setClickedMarker] = useState<number | null>(null);

    useKakaoLoader();

    // 마커 클릭 핸들러
    const handleMarkerClick = (placeId: number) => {
        setClickedMarker(clickedMarker === placeId ? null : placeId);
    };

    // 오버레이 닫기 함수
    const closeOverlay = () => {
        setClickedMarker(null);
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
                            name: '서울역',
                            time: '09:00',
                            lat: 37.555134,
                            lng: 126.970701
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
                            description: '주소 전화번호 등 정보 어디까지 넣을 수 있는지용?',
                            lat: 37.5665,
                            lng: 126.9780
                        },
                        {
                            id: 3,
                            type: 'place',
                            name: '덕수궁',
                            time: '11:00',
                            lat: 37.5658,
                            lng: 126.9752
                        },
                        {
                            id: 4,
                            type: 'place',
                            name: '경복궁',
                            time: '12:00',
                            lat: 37.5796,
                            lng: 126.9770
                        },
                        {
                            id: 5,
                            type: 'place',
                            name: '창덕궁',
                            time: '13:00',
                            lat: 37.5796,
                            lng: 126.9910
                        },
                        {
                            id: 6,
                            type: 'place',
                            name: '통인시장',
                            time: '14:00',
                            lat: 37.5800,
                            lng: 126.9700
                        }
                    ]
                },
                {
                    day: 2,
                    items: [
                        {
                            id: 7,
                            type: 'departure',
                            name: '호텔',
                            time: '09:00',
                            lat: 37.5665,
                            lng: 126.9780
                        },
                        {
                            id: 8,
                            type: 'place',
                            name: '창덕궁',
                            time: '10:00',
                            lat: 37.5796,
                            lng: 126.9910
                        },
                        {
                            id: 9,
                            type: 'place',
                            name: '혜화극장',
                            time: '14:00',
                            lat: 37.5850,
                            lng: 127.0010
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
                            time: '09:00',
                            lat: 37.5665,
                            lng: 126.9780
                        },
                        {
                            id: 11,
                            type: 'place',
                            name: '남산타워',
                            time: '10:00',
                            lat: 37.5512,
                            lng: 126.9882
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
                            time: '09:00',
                            lat: 37.5665,
                            lng: 126.9780
                        },
                        {
                            id: 13,
                            type: 'place',
                            name: '명동',
                            time: '10:00',
                            lat: 37.5636,
                            lng: 126.9826
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
                            <div
                                key={item.id}
                                className={item.type === 'departure' ? styles.departureItemContainer : styles.itineraryItem}
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
                                {item.type !== 'departure' && (
                                    <div className={styles.reorderIcon}>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M2 4h12M2 8h12M2 12h12" stroke="#999" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                )}

                                <div className={styles.itemContent}>
                                    {item.type === 'departure' ? (
                                        <div className={styles.departureItem}>
                                            <span className={styles.departureLabel}>출발</span>
                                            <span className={styles.departureName}>{item.name}</span>
                                        </div>
                                    ) : (
                                        <div className={styles.placeItem}>
                                            <div className={styles.placeDetails}>
                                                <h3 className={styles.placeName}>{item.name}</h3>
                                                {expandedItems.has(item.id) && (
                                                    <div className={styles.expandedDetails}>
                                                        <div className={styles.expandedContent}>
                                                            {expandedItems.has(item.id) && (
                                                                <div className={styles.placeImage}>
                                                                    <div className={styles.imagePlaceholder}>
                                                                        📍
                                                                    </div>
                                                                </div>
                                                            )}
                                                            <div className={styles.detailsText}>
                                                                <div className={styles.statusAndDistance}>
                                                                    {item.status && (
                                                                        <div className={styles.statusOnly}>
                                                                            <span className={styles.status}>{item.status}</span>
                                                                            {item.time && <span className={styles.time}>{item.time} 까지</span>}
                                                                        </div>
                                                                    )}
                                                                    {item.distance && (
                                                                        <div className={styles.distance}>{item.distance}</div>
                                                                    )}
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
                                    <div className={styles.clickableOverlay}>
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
        </div>
    );
}
