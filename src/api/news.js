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
