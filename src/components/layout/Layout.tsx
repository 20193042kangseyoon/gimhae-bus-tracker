import React from 'react'
// 1. 카카오맵 SDK에서 Map 컴포넌트를 불러옵니다.
import { Map, useKakaoLoader } from 'react-kakao-maps-sdk'

export interface LayoutProps {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  // 🌟 마법의 코드: 컴포넌트가 스스로 카카오 스크립트를 켭니다 (Storybook이든 어디든 무조건 작동함)
  const [loading, error] = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_MAP_API_KEY,
    libraries: ['services'],
  })
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-100 flex flex-col md:flex-row">
      {/* (좌측/하단 사이드바 영역은 이전 코드와 100% 동일하게 유지) */}
      <aside
        className="
        z-10 bg-white shadow-2xl transition-all duration-300
        absolute bottom-0 w-full h-[60vh] rounded-t-3xl flex flex-col
        md:relative md:w-96 md:h-full md:rounded-none md:shadow-[4px_0_24px_rgba(0,0,0,0.1)]
      "
      >
        {/* ... 생략 (기존 코드 유지) ... */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 hidden md:block">
            🚌 실시간 버스 정보
          </h1>
          {children}
        </div>
      </aside>

      {/* 2. 임시 글자를 지우고, 진짜 카카오맵을 렌더링합니다! */}
      <main className="flex-1 relative bg-blue-50">
        {/* 스크립트가 로딩 중이거나 에러가 났을 때의 처리 */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            지도 로딩 중... ⏳
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center text-red-500">
            지도를 불러올 수 없습니다 🚨
          </div>
        )}

        {/* 로딩이 끝났을 때만 지도를 보여줍니다 */}
        {!loading && !error && (
          <Map
            center={{ lat: 35.1795543, lng: 129.0756416 }}
            style={{ width: '100%', height: '100%' }}
            level={3}
          ></Map>
        )}
      </main>
    </div>
  )
}
