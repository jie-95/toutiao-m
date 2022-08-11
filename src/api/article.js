import request from '@/utils/request'

/**
 *获取文章列表
 * @param {*} channelId 频道ID
 * @param {*} timetamp  请求第一页数据传当前时间戳，请求上一页数据传上一页的时间戳
 * @returns promise
 */
export const getArticleAPI = (channelId, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp
    }
  })
}

/**
 * 获取文章详情
 * @param {*} q
 * @returns
 */
export const getArtAPI = (q) => {
  return request({
    url: '/v1_0/articles/' + q
  })
}

/**
 * 收藏文章
 * @param {*} data
 * @returns
 */
export const isShouCangAPI = (data) => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data
  })
}

/**
 * 取消收藏文章
 * @param {*} data
 * @returns
 */
export const unCollect = (id) => {
  return request({
    url: '/v1_0/article/collections/' + id,
    method: 'DELETE'
  })
}

/**
 *
 * @param {*} data
 * @returns 文章点赞
 */
export const getLikingsAPI = (data) => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data
  })
}

/**
 * 不喜欢文章
 * @param {*} data
 * @returns
 */
export const unLikingsAPI = (data) => {
  return request({
    url: '/v1_0/article/dislikes',
    method: 'POST',
    data
  })
}

export const nomalLikeAPI = (id) => {
  return request({
    url: '/v1_0/article/dislikes/' + id,
    method: 'DELETE'
  })
}
