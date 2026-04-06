import { Map, useKakaoLoader, CustomOverlayMap } from 'react-kakao-maps-sdk'
import { useBusStore } from '@/store/useBusStore'
import { MapMarker } from '@/components/domain/MapMarker'

export interface LayoutProps {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  const [isMapLoading, mapError] = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_MAP_API_KEY,
    libraries: ['services'],
  })

  // 화면에 그려야 할 데이터(상태)만 구독합니다. (수정 로직 set... 제거됨)
  const busLocations = useBusStore((state) => state.busLocations)
  const isLoading = useBusStore((state) => state.isLoading)

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-100 flex flex-col md:flex-row">
      {/* 🚌 사이드바 영역 */}
      <aside
        className="
        z-10 bg-white shadow-2xl transition-all duration-300
        absolute bottom-0 w-full h-[60vh] rounded-t-3xl flex flex-col
        md:relative md:w-96 md:h-full md:rounded-none md:shadow-[4px_0_24px_rgba(0,0,0,0.1)]
      "
      >
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 hidden md:block">
            🚌 실시간 버스 정보
          </h1>
          {/* 외부(BusTrackingPage)에서 주입받은 BusList가 여기에 렌더링됩니다. */}
          {children}
        </div>
      </aside>

      {/* 🗺️ 메인 지도 영역 */}
      <main className="flex-1 relative bg-blue-50">
        {isMapLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            지도 로딩 중... ⏳
          </div>
        )}
        {mapError && (
          <div className="absolute inset-0 flex items-center justify-center text-red-500">
            지도를 불러올 수 없습니다 🚨
          </div>
        )}

        {/* 📡 API 데이터 로딩 알림창 */}
        {isLoading && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 bg-white px-6 py-3 rounded-full shadow-lg font-bold text-blue-600 animate-pulse">
            실시간 버스 위치 불러오는 중... 📡
          </div>
        )}

        {/* 📍 카카오맵 렌더링 및 마커 표시 */}
        {!isMapLoading && !mapError && (
          <Map
            center={{ lat: 35.2285, lng: 128.8894 }}
            style={{ width: '100%', height: '100%' }}
            level={6}
          >
            {busLocations.map((bus) => (
              <CustomOverlayMap
                key={bus.vehId || bus.plateNo}
                position={{ lat: bus.lat, lng: bus.lng }}
                // 💡 yAnchor={1} 설정 필수!
                // 이 설정이 있어야 마커의 '정중앙'이 아니라 '꼬리 끝부분(맨 아래)'이 좌표에 정확히 꽂힙니다.
                yAnchor={1}
                zIndex={1}
              >
                {/* 우리가 만든 예쁜 커스텀 React 마커를 내부에 렌더링합니다 */}
                <MapMarker
                  busNumber="1"
                  // TODO: 실제 API 데이터에 혼잡도가 있다면 연결해주세요. 임시로 '보통'을 넣었습니다.
                  status="보통"
                />
              </CustomOverlayMap>
            ))}
          </Map>
        )}
      </main>
    </div>
  )
}
