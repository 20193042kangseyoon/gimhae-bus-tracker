import { create } from 'zustand'

export interface IBusLocation {
  vehId: string // 차량 고유 ID (예: 100100123)
  plateNo: string // 차량 번호 (예: 경남71자1234)
  lat: number // 위도 (Y좌표)
  lng: number // 경도 (X좌표)
}

interface BusState {
  busLocations: IBusLocation[] // 지도와 목록에 뿌려줄 버스 배열
  isLoading: boolean // API 로딩 중인지 여부
  error: string | null // 에러 발생 시 메시지 보관
  lastUpdated: Date | null // 마지막으로 새로고침한 시간

  setBusLocations: (locations: IBusLocation[]) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
}

export const useBusStore = create<BusState>((set) => ({
  busLocations: [],
  isLoading: false,
  error: null,
  lastUpdated: null,

  setBusLocations: (locations) =>
    set({
      busLocations: locations,
      lastUpdated: new Date(),
    }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error, isLoading: false }),
}))
