export interface SkeletonProps {
  /** * 너비, 높이, 둥근 정도 등 뼈대의 모양을 자유롭게 결정할 수 있도록
   * 외부에서 Tailwind 클래스를 통째로 주입받습니다.
   */
  className?: string
}

export const Skeleton = ({ className = '' }: SkeletonProps) => {
  return (
    // animate-pulse: 부드럽게 깜빡이는 애니메이션 효과
    // bg-gray-200: 뼈대의 기본 회색 배경색
    <div className={`animate-pulse bg-gray-200 ${className}`} />
  )
}
