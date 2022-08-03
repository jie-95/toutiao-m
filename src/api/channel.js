import request from '@/utils/request'
import storage from '@/utils/storage'

export const getMyChannel = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}

/**
 *
 * @returns promise
 */
// 获取所有频道
export const getAllChannels = () => {
  return request({
    url: '/v1_0/channels'
  })
}

/**
 *
 * @param {*} target
 * @returns promise
 */
export const delChannel = (target) => {
  return request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
}

/**
 *
 * @param {*} id
 * @param {*} seq
 * @returns
 */
export const addChannel = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}

const HEIMA_TOUTIAO_MY_CHANNELS = 'HEIMA_TOUTIAO_MY_CHANNELS'
export const setMyChannelsToLocal = (myChannels) => {
  storage.set(HEIMA_TOUTIAO_MY_CHANNELS, myChannels)
}

export const getMyChannelByLocal = () => {
  return storage.get(HEIMA_TOUTIAO_MY_CHANNELS)
}
