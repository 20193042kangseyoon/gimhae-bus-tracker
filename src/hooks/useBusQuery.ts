import { useQuery } from '@tanstack/react-query'
import { fetchBusLocations } from '@/api/busApi'

export const useBusQuery = (routeId: string | null) => {
  return useQuery({
    queryKey: ['busLocations', routeId],
    queryFn: () => fetchBusLocations(routeId!),
    refetchInterval: 10000,
    enabled: !!routeId,
    throwOnError: true,
  })
}
