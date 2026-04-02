import { Badge } from '../common/Badge'

export interface BusCardProps {
  /** 버스 번호 (예: 701, 마을버스 3) */
  busNumber: string
  /** 향하는 방향 (예: 시청 방면) */
  destination: string
  /** 도착까지 남은 시간 (예: 3분, 곧 도착) */
  arrivalTime: string
  /** 혼잡도 상태 */
  status: '여유' | '보통' | '혼잡'
}

export const BusCard = ({ busNumber, destination, arrivalTime, status }: BusCardProps) => {
  return (
    <div className="w-full p-5 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      {/* 상단: 버스 정보 및 뱃지 영역 */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-extrabold text-gray-900">{busNumber}</h3>
          <p className="text-sm text-gray-500 mt-0.5">{destination}</p>
        </div>
        {/* 불러온 Badge 컴포넌트를 여기에 쏙 넣습니다! */}
        <Badge status={status} />
      </div>

      {/* 하단: 도착 시간 영역 */}
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold text-blue-600">{arrivalTime}</span>
        {/* 숫자로 들어올 경우 '후 도착' 글자를 붙여줍니다 */}
        {!isNaN(Number(arrivalTime)) && (
          <span className="text-sm font-medium text-gray-600">분 후 도착</span>
        )}
      </div>
    </div>
  )
}
