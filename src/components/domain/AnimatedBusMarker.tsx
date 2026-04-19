import React from 'react'
import { CustomOverlayMap } from 'react-kakao-maps-sdk'
// 👇 유성님이 만들어두신 예쁜 Tailwind 커스텀 마커를 불러옵니다. (경로는 맞게 수정해주세요)
import { MapMarker } from '@/components/domain/MapMarker'
import { useSmoothMove } from '@/hooks/useSmoothMove'
import type { IBusLocation } from '@/store/useBusStore'

interface Props {
  bus: IBusLocation
}

const MarkerComponent = ({ bus }: Props) => {
  // 🌟 마법의 훅 적용! 10초마다 갱신되는 목표 좌표를 넣어주면, 60fps로 변하는 좌표가 나옵니다.
  const animatedPos = useSmoothMove(bus.lat, bus.lng)

  return (
    <CustomOverlayMap
      position={animatedPos} // 뚝뚝 끊기는 좌표가 아닌, 부드러운 좌표 주입!
      yAnchor={1} // 발끝 기준점 (이전 트러블슈팅 완벽 적용)
      zIndex={1}
    >
      <MapMarker
        busNumber={bus.plateNo} // 실제 차량번호 주입
        status="보통" // (추후 혼잡도 데이터가 있다면 연결)
      />
    </CustomOverlayMap>
  )
}

// 🛡️ 렌더링 방어막: bus의 데이터(목표 좌표)가 바뀌지 않는 한 리렌더링을 철저히 막습니다.
export const AnimatedBusMarker = React.memo(MarkerComponent, (prevProps, nextProps) => {
  return prevProps.bus.lat === nextProps.bus.lat && prevProps.bus.lng === nextProps.bus.lng
})
