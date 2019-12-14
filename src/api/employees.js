import axios from '@/libs/api.request'

export const addWorker = (data) => {
  return axios.request({
    url: '/admin/worker',
    method: 'POST',
    data
  })
};

export const getWorker = () => {
  return axios.request({
    url: '/admin/worker',
    method: 'get'
  })
};
