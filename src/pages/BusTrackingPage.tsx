import { useEffect } from 'react'
import { useBusStore } from '@/store/useBusStore'
import { useBusQuery } from '@/hooks/useBusQuery'
import { Layout } from '@/components/layout/Layout'
import { BusList } from '@/components/domain/BusList'

export default function BusTrackingPage() {
  const ROUTE_ID = 'GHB5'

  const {
    data: remoteBusList,
    isLoading: isQueryLoading,
    error: queryError,
  } = useBusQuery(ROUTE_ID)

  const busLocations = useBusStore((state) => state.busLocations)
  const setBusLocations = useBusStore((state) => state.setBusLocations)
  const setLoading = useBusStore((state) => state.setLoading)
  const setError = useBusStore((state) => state.setError)

  // 🌟 [핵심] 동기화 로직: Query 데이터가 들어오거나 바뀔 때마다 Zustand 업데이트
  useEffect(() => {
    // 로딩 상태 동기화
    setLoading(isQueryLoading)

    if (queryError) {
      setError('실시간 데이터를 가져오는데 실패했습니다.')
    }

    // 데이터 동기화 (10초마다 Query가 새 데이터를 가져오면 이 블록이 실행됨)
    if (remoteBusList) {
      setBusLocations(remoteBusList)
      setError(null) // 성공 시 에러 초기화
    }
  }, [remoteBusList, isQueryLoading, queryError, setBusLocations, setLoading, setError])

  return (
    <Layout>
      <BusList busLocations={busLocations} />
    </Layout>
  )
}
