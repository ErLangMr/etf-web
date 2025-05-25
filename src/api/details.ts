import { get, post } from '@/utils/request'

export const getETFChartDataApi = (params: any) => {
  return get(`/api/funds/kline`, params)
}

