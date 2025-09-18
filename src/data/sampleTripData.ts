// 여행 상세 데이터 타입 정의
export interface TripDetailData {
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
            tel?: string;
            lat?: number;
            lng?: number;
            mapX?: string;
            mapY?: string;
            contentId?: string;
        }[];
    }[];
}

// 예시 여행 데이터
export const sampleTripData: { [key: number]: TripDetailData } = {
    1: {
        id: 1,
        title: "서울 2박 3일 여행",
        destination: "서울",
        date: "2024년 1월 15일",
        days: [
            {
                day: 1,
                items: [
                    {
                        id: 1,
                        type: 'departure',
                        name: '홍성원',
                        lat: 37.5665,
                        lng: 126.9780,
                        mapX: '126.9780',
                        mapY: '37.5665',
                        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
                        description: '서울의 중심가에서 시작하는 여행',
                        tel: '02-1234-5678'
                    },
                    {
                        id: 2,
                        type: 'place',
                        name: '경복궁',
                        lat: 37.5796,
                        lng: 126.9770,
                        mapX: '126.9770',
                        mapY: '37.5796',
                        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
                        description: '조선왕조의 대표 궁궐',
                        tel: '02-3700-3900',
                        reviews: 1250
                    },
                    {
                        id: 3,
                        type: 'place',
                        name: '남산타워',
                        lat: 37.5512,
                        lng: 126.9882,
                        mapX: '126.9882',
                        mapY: '37.5512',
                        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
                        description: '서울의 전망대',
                        tel: '02-3455-9277',
                        reviews: 890
                    }
                ]
            },
            {
                day: 2,
                items: [
                    {
                        id: 4,
                        type: 'place',
                        name: '명동',
                        lat: 37.5636,
                        lng: 126.9850,
                        mapX: '126.9850',
                        mapY: '37.5636',
                        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
                        description: '서울의 대표 쇼핑거리',
                        tel: '02-120',
                        reviews: 2100
                    },
                    {
                        id: 5,
                        type: 'place',
                        name: '홍대',
                        lat: 37.5563,
                        lng: 126.9236,
                        mapX: '126.9236',
                        mapY: '37.5563',
                        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
                        description: '젊음의 거리',
                        tel: '02-120',
                        reviews: 1500
                    }
                ]
            },
            {
                day: 3,
                items: [
                    {
                        id: 6,
                        type: 'place',
                        name: '강남역',
                        lat: 37.4979,
                        lng: 127.0276,
                        mapX: '127.0276',
                        mapY: '37.4979',
                        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
                        description: '강남의 중심',
                        tel: '02-120',
                        reviews: 980
                    }
                ]
            }
        ]
    },
    2: {
        id: 2,
        title: "부산 바다 여행",
        destination: "부산",
        date: "2024년 2월 10일",
        days: [
            {
                day: 1,
                items: [
                    {
                        id: 7,
                        type: 'departure',
                        name: '부산역',
                        lat: 35.1167,
                        lng: 129.0403,
                        mapX: '129.0403',
                        mapY: '35.1167',
                        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
                        description: '부산 여행의 시작점',
                        tel: '051-123-4567'
                    },
                    {
                        id: 8,
                        type: 'place',
                        name: '해운대해수욕장',
                        lat: 35.1587,
                        lng: 129.1603,
                        mapX: '129.1603',
                        mapY: '35.1587',
                        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
                        description: '부산의 대표 해수욕장',
                        tel: '051-749-5700',
                        reviews: 3200
                    },
                    {
                        id: 9,
                        type: 'place',
                        name: '감천문화마을',
                        lat: 35.0974,
                        lng: 129.0084,
                        mapX: '129.0084',
                        mapY: '35.0974',
                        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
                        description: '부산의 산토리니',
                        tel: '051-204-1444',
                        reviews: 1800
                    }
                ]
            },
            {
                day: 2,
                items: [
                    {
                        id: 10,
                        type: 'place',
                        name: '부산타워',
                        lat: 35.1014,
                        lng: 129.0324,
                        mapX: '129.0324',
                        mapY: '35.1014',
                        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
                        description: '부산의 전망대',
                        tel: '051-245-3700',
                        reviews: 1200
                    }
                ]
            }
        ]
    },
    3: {
        id: 3,
        title: "제주도 힐링 여행",
        destination: "제주도",
        date: "2024년 3월 5일",
        days: [
            {
                day: 1,
                items: [
                    {
                        id: 11,
                        type: 'departure',
                        name: '제주공항',
                        lat: 33.4996,
                        lng: 126.5312,
                        mapX: '126.5312',
                        mapY: '33.4996',
                        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
                        description: '제주도 여행의 시작점',
                        tel: '064-797-2114'
                    },
                    {
                        id: 12,
                        type: 'place',
                        name: '성산일출봉',
                        lat: 33.4584,
                        lng: 126.9420,
                        mapX: '126.9420',
                        mapY: '33.4584',
                        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
                        description: '제주도의 대표 관광지',
                        tel: '064-710-7923',
                        reviews: 4500
                    }
                ]
            },
            {
                day: 2,
                items: [
                    {
                        id: 13,
                        type: 'place',
                        name: '한라산',
                        lat: 33.3617,
                        lng: 126.5312,
                        mapX: '126.5312',
                        mapY: '33.3617',
                        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
                        description: '제주도의 최고봉',
                        tel: '064-713-9950',
                        reviews: 2800
                    }
                ]
            },
            {
                day: 3,
                items: [
                    {
                        id: 14,
                        type: 'place',
                        name: '제주올레',
                        lat: 33.4996,
                        lng: 126.5312,
                        mapX: '126.5312',
                        mapY: '33.4996',
                        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
                        description: '제주도의 대표 트레킹 코스',
                        tel: '064-728-3394',
                        reviews: 3200
                    }
                ]
            },
            {
                day: 4,
                items: [
                    {
                        id: 15,
                        type: 'place',
                        name: '성산일출봉',
                        lat: 33.4584,
                        lng: 126.9420,
                        mapX: '126.9420',
                        mapY: '33.4584',
                        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
                        description: '제주도의 대표 관광지 (재방문)',
                        tel: '064-710-7923',
                        reviews: 4500
                    }
                ]
            }
        ]
    },
    4: {
        id: 4,
        title: "경주 역사 여행",
        destination: "경주",
        date: "2024년 3월 20일",
        days: [
            {
                day: 1,
                items: [
                    {
                        id: 16,
                        type: 'departure',
                        name: '경주역',
                        lat: 35.7894,
                        lng: 129.3316,
                        mapX: '129.3316',
                        mapY: '35.7894',
                        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
                        description: '경주 여행의 시작점',
                        tel: '054-123-4567'
                    },
                    {
                        id: 17,
                        type: 'place',
                        name: '불국사',
                        lat: 35.7894,
                        lng: 129.3316,
                        mapX: '129.3316',
                        mapY: '35.7894',
                        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
                        description: '신라의 대표 불교 유적',
                        tel: '054-746-9913',
                        reviews: 3800
                    },
                    {
                        id: 18,
                        type: 'place',
                        name: '석굴암',
                        lat: 35.7894,
                        lng: 129.3316,
                        mapX: '129.3316',
                        mapY: '35.7894',
                        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
                        description: '신라의 대표 석굴',
                        tel: '054-746-9913',
                        reviews: 2200
                    }
                ]
            },
            {
                day: 2,
                items: [
                    {
                        id: 19,
                        type: 'place',
                        name: '경주월드',
                        lat: 35.7894,
                        lng: 129.3316,
                        mapX: '129.3316',
                        mapY: '35.7894',
                        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
                        description: '경주의 테마파크',
                        tel: '054-745-2000',
                        reviews: 1500
                    }
                ]
            }
        ]
    },
    5: {
        id: 5,
        title: "서울 맛집 투어",
        destination: "서울",
        date: "2024년 4월 1일",
        days: [
            {
                day: 1,
                items: [
                    {
                        id: 20,
                        type: 'departure',
                        name: '홍대입구역',
                        lat: 37.5563,
                        lng: 126.9236,
                        mapX: '126.9236',
                        mapY: '37.5563',
                        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
                        description: '맛집 투어의 시작점',
                        tel: '02-120'
                    },
                    {
                        id: 21,
                        type: 'place',
                        name: '명동',
                        lat: 37.5636,
                        lng: 126.9850,
                        mapX: '126.9850',
                        mapY: '37.5636',
                        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
                        description: '서울의 대표 쇼핑거리',
                        tel: '02-120',
                        reviews: 2100
                    },
                    {
                        id: 22,
                        type: 'place',
                        name: '홍대',
                        lat: 37.5563,
                        lng: 126.9236,
                        mapX: '126.9236',
                        mapY: '37.5563',
                        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
                        description: '젊음의 거리',
                        tel: '02-120',
                        reviews: 1500
                    },
                    {
                        id: 23,
                        type: 'place',
                        name: '강남역',
                        lat: 37.4979,
                        lng: 127.0276,
                        mapX: '127.0276',
                        mapY: '37.4979',
                        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
                        description: '강남의 중심',
                        tel: '02-120',
                        reviews: 980
                    }
                ]
            }
        ]
    },
    6: {
        id: 6,
        title: "부산 감천문화마을 탐방",
        destination: "부산",
        date: "2024년 4월 15일",
        days: [
            {
                day: 1,
                items: [
                    {
                        id: 24,
                        type: 'departure',
                        name: '부산역',
                        lat: 35.1167,
                        lng: 129.0403,
                        mapX: '129.0403',
                        mapY: '35.1167',
                        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
                        description: '부산 여행의 시작점',
                        tel: '051-123-4567'
                    },
                    {
                        id: 25,
                        type: 'place',
                        name: '감천문화마을',
                        lat: 35.0974,
                        lng: 129.0084,
                        mapX: '129.0084',
                        mapY: '35.0974',
                        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
                        description: '부산의 산토리니',
                        tel: '051-204-1444',
                        reviews: 1800
                    }
                ]
            }
        ]
    }
};

// 예시 데이터를 가져오는 함수
export const getSampleTripData = (tripId: number): TripDetailData => {
    return sampleTripData[tripId] || sampleTripData[1];
};
