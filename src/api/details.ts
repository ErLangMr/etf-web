import { get, post } from '@/utils/request'

export const getETFChartDataApi = (params: any) => {
  return get(`/api/funds/kline`, params)
}

export const getOneDetailsDataApi = (params: any): Promise<any> => {
  return get(`/api/funds/by-code/${params}`)
}