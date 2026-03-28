// 1. Props 타입 정의 (3가지 상태만 허용)
export interface BadgeProps {
  status: '여유' | '보통' | '혼잡'
}

// 2. 상태별 Tailwind CSS 클래스 매핑
const statusStyles = {
  여유: 'bg-green-100 text-green-700 border-green-200',
  보통: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  혼잡: 'bg-red-100 text-red-700 border-red-200',
}

// 3. 뱃지 렌더링 함수
export const Badge = ({ status }: BadgeProps) => {
  return (
    <span
      className={`inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-semibold border ${statusStyles[status]}`}
    >
      {status}
    </span>
  )
}
