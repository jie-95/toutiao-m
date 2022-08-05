import request from '@/utils/request'

export const getSearchSuggestionListAPI = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: { q }
  })
}
