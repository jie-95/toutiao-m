import request from '@/utils/request'

/**
 *
 * @param {String} mobile 手机号
 * @param {String} code 验证码
 * @returns promise
 */

export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { mobile, code }
  })
}
export const getCodeApi = (mobile, text) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`,
    data: { mobile, text }
  })
}

export const getUserInfo = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}

/**
 *上传头像
 * @param {*} file
 * @returns promise
 */
export const uploadAvator = (file) => {
  const fm = new FormData()
  fm.append('photo', file)
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: fm
  })
}
