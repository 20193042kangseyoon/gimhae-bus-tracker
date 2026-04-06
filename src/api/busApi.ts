import axios from 'axios'
import type { IBusLocation } from '../store/useBusStore'

const CITY_CODE = 38070

interface IPublicBusItem {
  nodeid: string // 차량번호
  vehicleno: string
  gpslati: number // 위도
  gpslong: number // 경도
}

// 공공데이터 노선 정보 응답 아이템 타입
interface IPublicRouteItem {
  routeid: string // 김해 1번 버스 노선 id === GHB5
  routeno: number | string // 노선 번호 (예: 1)
  routetp?: string // 노선 유형 (일반버스, 좌석버스 등 - 선택사항)
  endnodenm?: string // 종점명
  startnodenm?: string // 기점명
}

export const fetchBusLocations = async (routeId: string): Promise<IBusLocation[]> => {
  try {
    const response = await axios.get('/api/1613000/BusLcInfoInqireService/getRouteAcctoBusLcList', {
      params: {
        pageNo: 1,
        numOfRows: 5,
        _type: 'json',
        cityCode: CITY_CODE,
        routeId: routeId,
      },
    })

    const items = response.data.response?.body?.items?.item
    if (!items) return []

    // 💡 [실무 꿀팁] 공공데이터는 결과가 1개일 땐 '객체', 여러 개일 땐 '배열'로 옵니다.
    // 무조건 배열(Array) 형태로 통일해주는 방어 코드가 필수입니다!
    const itemList = Array.isArray(items) ? items : [items]

    // 4. 받아온 날것의 데이터를 우리 Store의 IBusLocation 타입에 맞게 예쁘게 재포장
    const formattedData: IBusLocation[] = itemList.map((item: IPublicBusItem) => ({
      vehId: item.nodeid, // 고유 ID로 차량번호 사용
      plateNo: item.vehicleno, // 차량번호 (예: 경남71자1234)
      lat: Number(item.gpslati), // 위도 (문자열로 올 수 있으니 숫자로 변환)
      lng: Number(item.gpslong), // 경도
    }))

    return formattedData // 깔끔하게 가공된 배열 반환!
  } catch (error) {
    console.error('🚨 버스 위치 데이터를 가져오는 중 에러 발생:', error)
    throw error // 여기서 에러를 던지면 Zustand 스토어가 받아서 처리할 겁니다.
  }
}

export const fetchRouteId = async (routeNo: string): Promise<string | null> => {
  try {
    const response = await axios.get('/api/1613000/BusRouteInfoInqireService/getRouteNoList', {
      params: {
        cityCode: CITY_CODE, // 김해시 코드
        routeNo: routeNo, // 찾고 싶은 버스 번호 (예: '1')
        _type: 'json',
      },
    })
    console.log(routeNo, response.data)

    const items = response.data.response?.body?.items?.item
    if (!items) return null

    // 여러 결과 중 정확히 내가 찾는 번호와 일치하는 것 선택
    // 응답을 1번 버스만 넘기는 것이 아닌 1이 포함된 모든 노선 번호(1, 21, 11, ... )을 넘기기 때문에 필터링 작업이 필수
    const itemList = Array.isArray(items) ? items : [items]
    const match = itemList.find((item: IPublicRouteItem) => String(item.routeno) === routeNo)

    return match ? match.routeid : null // 찾은 routeid 반환 (예: GMB194000001)
  } catch (error) {
    console.error('🚨 노선 ID 조회 중 에러 발생:', error)
    return null
  }
}
