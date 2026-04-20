import { useState, useEffect, useRef } from 'react'

export const useSmoothMove = (targetLat: number, targetLng: number, duration: number = 9500) => {
  // 화면에 실제로 그려질 60fps짜리 실시간 좌표 (초기값은 첫 목표 위치)
  const [currentPos, setCurrentPos] = useState({ lat: targetLat, lng: targetLng })

  // 애니메이션 계산을 위한 참조값들 (리렌더링을 유발하지 않음!)
  const startPos = useRef({ lat: targetLat, lng: targetLng })
  const startTime = useRef<number | null>(null)
  const requestRef = useRef<number | null>(null)
  useEffect(() => {
    // 💡 새로운 목표(target) 좌표가 들어오면 애니메이션을 처음부터 다시 세팅합니다.
    startPos.current = currentPos // 출발점을 '지금 마커가 있던 위치'로 갱신
    startTime.current = null // 타이머 초기화

    const animate = (time: number) => {
      if (!startTime.current) startTime.current = time
      const elapsed = time - startTime.current
      const progress = Math.min(elapsed / duration, 1) // 0부터 시작해서 1이 되면 도착!

      // 🧮 선형 보간(LERP) 수학 공식: 시작점 + (목표점 - 시작점) * 진행률
      const lat = startPos.current.lat + (targetLat - startPos.current.lat) * progress
      const lng = startPos.current.lng + (targetLng - startPos.current.lng) * progress

      setCurrentPos({ lat, lng }) // 마커 위치 아주 조금(1프레임) 이동!

      if (progress < 1) {
        // 아직 1(도착)이 안 되었다면 다음 프레임 예약
        requestRef.current = requestAnimationFrame(animate)
      }
    }

    // 애니메이션 큐(Queue)에 등록하여 실행
    requestRef.current = requestAnimationFrame(animate)

    // 컴포넌트가 언마운트되거나 새 좌표가 들어오면 이전 애니메이션 취소 (메모리 누수 방지)
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [targetLat, targetLng, duration]) // 목표 좌표가 바뀔 때마다 재실행됨

  return currentPos
}
