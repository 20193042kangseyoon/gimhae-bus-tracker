import { BusCard } from './BusCard'

// 🌟 1. Props 타입을 정의합니다. (Zustand 스토어의 데이터 구조와 동일하게)
export interface BusListProps {
  busLocations: Array<{
    vehId: string
    plateNo: string
    lat: number
    lng: number
  }>
}

// 🌟 2. Zustand 대신 Props로 데이터를 받습니다.
export const BusList = ({ busLocations }: BusListProps) => {
  if (!busLocations || busLocations.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-gray-500">
        현재 운행 중인 버스가 없습니다.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {busLocations.map((bus) => (
        <BusCard
          key={bus.plateNo}
          busNumber={bus.plateNo}
          destination="종점 방면"
          arrivalTime="곧 도착"
          status="보통"
        />
      ))}
    </div>
  )
}
