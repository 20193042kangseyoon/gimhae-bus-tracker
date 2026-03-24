import React from 'react'

export interface LayoutProps {
  /** 이 레이아웃 안에 담길 내용물 (버스 카드 목록 등) */
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    // 전체 화면을 꽉 채우고(h-screen) 스크롤을 없앱니다(overflow-hidden).
    <div className="relative w-full h-screen overflow-hidden bg-gray-100 flex flex-col md:flex-row">
      {/* 1. 콘텐츠 영역 (모바일: 바텀 시트 / PC: 좌측 사이드바) */}
      <aside
        className="
        z-10 bg-white shadow-2xl transition-all duration-300
        /* [모바일 기본] 하단 고정, 위쪽 모서리 둥글게, 화면 높이의 60% 차지 */
        absolute bottom-0 w-full h-[60vh] rounded-t-3xl flex flex-col
        /* [PC (md 이상)] 좌측 고정, 모서리 둥글기 제거, 화면 꽉 차는 높이, 너비 384px(w-96) */
        md:relative md:w-96 md:h-full md:rounded-none md:shadow-[4px_0_24px_rgba(0,0,0,0.1)]
      "
      >
        {/* 모바일에서만 보이는 바텀 시트 드래그 핸들 (회색 짧은 막대기) */}
        <div className="w-full flex justify-center pt-3 pb-2 md:hidden">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>

        {/* 실제 카드들이 들어갈 스크롤 영역 */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 hidden md:block">
            🚌 실시간 버스 정보
          </h1>
          {/* 외부에서 전달받은 카드들을 여기에 렌더링합니다 */}
          {children}
        </div>
      </aside>

      {/* 2. 지도 영역 (배경) */}
      <main className="flex-1 relative bg-blue-50">
        {/* 나중에 카카오/네이버 지도가 들어갈 임시 자리 */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium">
          <span>이곳에 지도가 렌더링됩니다 🗺️</span>
        </div>
      </main>
    </div>
  )
}
