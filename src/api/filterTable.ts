import { get } from '@/utils/request'

export const getFilterTableApi = () => {
  return get('/api/funds/by-category')
}

export const getTypeByCategoryApi = (type: string, category?: string) => {
  return get('/api/funds/by-category/getTypeByCategory', {type,category,})
}
