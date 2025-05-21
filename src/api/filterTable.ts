import { get } from '@/utils/request'

export const getFilterTable = () => {
  return get('/api/funds/by-category')
}

