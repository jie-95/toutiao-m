import request from '@/utils/request'
// 让所有请求自动加上请求头

export const getMyChannel = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
