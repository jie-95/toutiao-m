import request from '@/utils/request'

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

/**
 * 对评论进行评论
 * @param {*} data
 * @returns
 */
export const sendCommentsAPI = (data) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data
  })
}
