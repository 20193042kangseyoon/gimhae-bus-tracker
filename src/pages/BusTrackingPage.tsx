import { useEffect } from 'react'
import { useBusStore } from '@/store/useBusStore'
import { fetchBusLocations } from '@/api/busApi'
import { Layout } from '@/components/layout/Layout'
import { BusList } from '@/components/domain/BusList'

export default function BusTrackingPage() {
  // 🌟 1. 자식에게 넘겨줄 '데이터'와 데이터를 세팅할 '함수'를 모두 스토어에서 꺼냅니다.
  const busLocations = useBusStore((state) => state.busLocations)

  const setBusLocations = useBusStore((state) => state.setBusLocations)
  const setLoading = useBusStore((state) => state.setLoading)
  const setError = useBusStore((state) => state.setError)

  // 🌟 2. 마운트 시 공공데이터 API를 호출하여 스토어를 업데이트합니다.
  useEffect(() => {
    const initApp = async () => {
      setLoading(true)
      try {
        const data = await fetchBusLocations('GHB5')
        setBusLocations(data)
        // const routeId = await fetchRouteId('1')
        // if (routeId) {
        //   const data = await fetchBusLocations(routeId)
        //   setBusLocations(data) // 이 함수가 실행되면 위의 busLocations 상태가 업데이트됩니다.
        //}
      } catch (err) {
        setError('데이터 로드 실패')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    initApp()
  }, [setBusLocations, setLoading, setError])

  // 🌟 3. 순수 UI 컴포넌트인 Layout과 BusList를 조립하고, Props를 주입합니다.
  return (
    <Layout>
      <BusList busLocations={busLocations} />
    </Layout>
  )
}
