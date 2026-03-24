import React from 'react'

export interface MapMarkerProps {
  /** 마커에 표시될 버스 번호 */
  busNumber: string
  /** 혼잡도에 따라 마커 색상이 변하도록 상태를 받습니다 */
  status: '여유' | '보통' | '혼잡'
}

// 혼잡도에 따른 배경색 매핑 사전
const statusColors = {
  여유: 'bg-green-500',
  보통: 'bg-yellow-500',
  혼잡: 'bg-red-500',
}

export const MapMarker = ({ busNumber, status }: MapMarkerProps) => {
  return (
    // 마우스를 올리면 살짝 위로 떠오르는 애니메이션(hover:-translate-y-1)을 줍니다.
    <div className="relative flex flex-col items-center cursor-pointer hover:-translate-y-1 transition-transform duration-200">
      {/* 1. 핀 몸통 (둥근 버스 번호판) */}
      <div
        className={`px-3 py-1 text-white text-sm font-extrabold rounded-full shadow-md z-10 ${statusColors[status]}`}
      >
        {busNumber}
      </div>

      {/* 2. 핀 꼬리 (네모를 45도 돌려서 마름모로 만든 뒤, 위로 살짝 끌어올려서 꼬리처럼 보이게 함) */}
      <div className={`w-3 h-3 ${statusColors[status]} rotate-45 -mt-1.5 shadow-sm`}></div>
    </div>
  )
}
