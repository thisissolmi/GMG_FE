// 현재 위치를 가져오는 유틸리티 함수들
import { useState } from 'react';

export interface LocationData {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

export interface GeolocationError {
  code: number;
  message: string;
}

// 현재 위치를 가져오는 Promise 기반 함수
export const getCurrentPosition = (): Promise<LocationData> => {
  return new Promise((resolve, reject) => {
    // 브라우저에서 geolocation API 지원 여부 확인
    if (!navigator.geolocation) {
      reject({
        code: -1,
        message: 'Geolocation is not supported by this browser.'
      });
      return;
    }

    const options: PositionOptions = {
      enableHighAccuracy: true, // 높은 정확도 사용
      timeout: 10000, // 10초 타임아웃
      maximumAge: 300000 // 5분간 캐시된 위치 사용 가능
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
      },
      (error) => {
        let errorMessage = '';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'User denied the request for Geolocation.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'The request to get user location timed out.';
            break;
          default:
            errorMessage = 'An unknown error occurred.';
            break;
        }

        reject({
          code: error.code,
          message: errorMessage
        });
      },
      options
    );
  });
};

// 현재 위치를 가져오는 Hook (React용)
export const useCurrentPosition = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [error, setError] = useState<GeolocationError | null>(null);
  const [loading, setLoading] = useState(false);

  const getLocation = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const position = await getCurrentPosition();
      setLocation(position);
    } catch (err) {
      setError(err as GeolocationError);
    } finally {
      setLoading(false);
    }
  };

  return { location, error, loading, getLocation };
};

// 위치 권한 요청 함수
export const requestLocationPermission = async (): Promise<boolean> => {
  try {
    const permission = await navigator.permissions.query({ name: 'geolocation' as PermissionName });
    return permission.state === 'granted';
  } catch (error) {
    console.warn('Permission API not supported, trying direct geolocation...');
    // Permission API가 지원되지 않는 경우 직접 시도
    try {
      await getCurrentPosition();
      return true;
    } catch {
      return false;
    }
  }
};

// 위치 정보를 콘솔에 출력하는 디버그 함수
export const logCurrentPosition = async () => {
  try {
    const position = await getCurrentPosition();
    console.log('Current Position:', {
      latitude: position.latitude,
      longitude: position.longitude,
      accuracy: position.accuracy
    });
    return position;
  } catch (error) {
    console.error('Failed to get current position:', error);
    throw error;
  }
};

// 두 위치 간의 거리 계산 (Haversine formula)
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // 지구의 반지름 (km)
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // km
  return distance;
};

// 거리를 적절한 단위로 포맷팅하는 함수
export const formatDistance = (distanceKm: number): string => {
  if (distanceKm < 1) {
    // 1km 미만이면 미터 단위로 표시
    const meters = Math.round(distanceKm * 1000);
    return `${meters}m`;
  } else {
    // 1km 이상이면 km 단위로 표시 (소수점 1자리)
    return `${distanceKm.toFixed(1)}km`;
  }
};

// 현재 위치에서 관광 장소까지의 거리 계산 및 포맷팅
export const calculateDistanceToPlace = (
  currentLat: number,
  currentLng: number,
  placeMapX: string | number,
  placeMapY: string | number
): string => {
  const placeLat = typeof placeMapY === 'string' ? parseFloat(placeMapY) : placeMapY;
  const placeLng = typeof placeMapX === 'string' ? parseFloat(placeMapX) : placeMapX;
  
  const distanceKm = calculateDistance(currentLat, currentLng, placeLat, placeLng);
  return formatDistance(distanceKm);
};

// 여러 장소와의 거리를 계산하는 함수
export const calculateDistancesToPlaces = (
  currentLat: number,
  currentLng: number,
  places: Array<{ mapX: string | number; mapY: string | number; name: string }>
): Array<{ name: string; distance: string; distanceKm: number }> => {
  return places.map(place => {
    const placeLat = typeof place.mapY === 'string' ? parseFloat(place.mapY) : place.mapY;
    const placeLng = typeof place.mapX === 'string' ? parseFloat(place.mapX) : place.mapX;
    
    const distanceKm = calculateDistance(currentLat, currentLng, placeLat, placeLng);
    const distance = formatDistance(distanceKm);
    
    return {
      name: place.name,
      distance,
      distanceKm
    };
  });
};
