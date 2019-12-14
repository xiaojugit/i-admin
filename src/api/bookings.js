import axios from '@/libs/api.request'

export const getOrders = (data) => {
  return axios.request({
    url: '/admin/order/getOrders',
    method: 'get',
    data
  })
}
export const updateStatus = (data) => {
  return axios.request({
    url: '/admin/order/updateStatus',
    method: 'PUT',
    params: data
  })
}
