// 1. Props 정의: 외부에서 보여줄 시간 텍스트만 쏙 전달받습니다.
export interface TimerProps {
  timeText: string
}

// 2. 타이머 렌더링 함수
export const Timer = ({ timeText }: TimerProps) => {
  return (
    <div className="flex items-center text-xs text-gray-500">
      {/* 시계 모양의 SVG 아이콘 */}
      <svg
        className="w-3.5 h-3.5 mr-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      {/* 전달받은 텍스트 출력 */}
      <span>{timeText}</span>
    </div>
  )
}
