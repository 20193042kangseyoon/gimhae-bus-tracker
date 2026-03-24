import React from 'react'
// 우리가 방금 만든 만능 뼈대 부품을 불러옵니다!
import { Skeleton } from '../common/Skeleton'

export const SkeletonBusCard = () => {
  return (
    // 실제 BusCard와 동일한 배경, 테두리, 여백을 줍니다.
    <div className="w-full p-5 bg-white border border-gray-200 rounded-2xl shadow-sm">
      {/* 상단: 버스 정보 및 뱃지 영역 */}
      <div className="flex justify-between items-start mb-4">
        <div>
          {/* 버스 번호 뼈대 (크고 두껍게) */}
          <Skeleton className="w-16 h-7 rounded mb-1.5" />
          {/* 목적지 뼈대 (작고 얇게) */}
          <Skeleton className="w-24 h-4 rounded" />
        </div>
        {/* 혼잡도 뱃지 뼈대 (둥글게) */}
        <Skeleton className="w-12 h-6 rounded-full" />
      </div>

      {/* 하단: 도착 시간 영역 */}
      <div className="flex items-baseline gap-2 mt-4">
        {/* 남은 시간 숫자 뼈대 */}
        <Skeleton className="w-10 h-9 rounded" />
        {/* '분 후 도착' 글자 뼈대 */}
        <Skeleton className="w-16 h-5 rounded" />
      </div>
    </div>
  )
}
