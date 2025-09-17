// 지도 관련 유틸리티 함수들

// 장소 타입 정의
export interface Place {
    id: number;
    name: string;
    lat: number;
    lng: number;
    type: 'departure' | 'place';
}

// 좌표 타입 정의
export interface Coordinates {
    lat: number;
    lng: number;
}

/**
 * 주어진 장소들의 중심 좌표를 계산하는 함수
 * @param places 좌표가 포함된 장소 배열
 * @returns 중심 좌표
 */
export const calculateCenter = (places: Coordinates[]): Coordinates => {
    if (places.length === 0) {
        return { lat: 37.5665, lng: 126.9780 }; // 기본값 (서울)
    }
    
    if (places.length === 1) {
        return { lat: places[0].lat, lng: places[0].lng };
    }

    // 모든 좌표의 평균을 계산
    const totalLat = places.reduce((sum, place) => sum + place.lat, 0);
    const totalLng = places.reduce((sum, place) => sum + place.lng, 0);
    
    return {
        lat: totalLat / places.length,
        lng: totalLng / places.length
    };
};

/**
 * 장소들을 순서대로 연결하는 선의 경로를 생성하는 함수
 * @param places 좌표가 포함된 장소 배열
 * @returns 선의 경로 좌표 배열
 */
export const createRoutePath = (places: Coordinates[]): Coordinates[] => {
    if (places.length < 2) return [];
    
    // 장소들을 순서대로 연결
    return places.map(place => ({ lat: place.lat, lng: place.lng }));
};

/**
 * 시작 장소와 그 다음 장소만 연결하는 선의 경로를 생성하는 함수
 * @param places 좌표가 포함된 장소 배열
 * @returns 선의 경로 좌표 배열 (시작점과 두 번째 점만)
 */
export const createSimpleRoutePath = (places: Coordinates[]): Coordinates[] => {
    if (places.length < 2) return [];
    
    // 시작 장소와 그 다음 장소만 연결
    return [
        { lat: places[0].lat, lng: places[0].lng },
        { lat: places[1].lat, lng: places[1].lng }
    ];
};

/**
 * 여행 아이템 데이터를 지도용 장소 데이터로 변환하는 함수
 * @param items 여행 아이템 배열
 * @returns 지도용 장소 배열
 */
export const convertToMapPlaces = (items: any[]): Place[] => {
    return items
        .filter(item => item.lat && item.lng)
        .map(item => ({
            id: item.id,
            name: item.name,
            lat: item.lat,
            lng: item.lng,
            type: item.type
        }));
};

/**
 * 마커 이미지 설정을 반환하는 함수
 * @param type 장소 타입
 * @returns 마커 이미지 설정 객체
 */
export const getMarkerImage = (type: 'departure' | 'place') => {
    return {
        src: type === 'departure' 
            ? "/startPlace.svg"
            : "/place.svg",
        size: { width: 30, height: 30 }
    };
};

/**
 * 폴리라인 스타일 설정을 반환하는 함수
 * @returns 폴리라인 스타일 설정 객체
 */
export const getPolylineStyle = () => {
    return {
        strokeWeight: 15,
        strokeColor: "#FF6B6B",
        strokeOpacity: 1,
        strokeStyle: "solid" as const
    };
};
