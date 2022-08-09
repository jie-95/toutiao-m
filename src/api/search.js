import request from '@/utils/request'

export const getSearchResultsAPI = (q) => {
  return request({
    url: '/v1_0/search',
    params: { q }
  })
}

export const getSearchSuggestionListAPI = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: { q }
  })
}

export const getArtAPI = (q) => {
  return request({
    url: '/v1_0/articles/' + q
  })
}

/**
 * 获取文章评论
 * @param {*} data
 * @returns
 */
export const getCommentsAPI = (params) => {
  return request({
    url: '/v1_0/comments',
    params
  })
}
