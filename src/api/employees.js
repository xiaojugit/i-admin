import axios from '@/libs/api.request'

export const addWorker = () => {
  return axios.request({
    url: '/admin/worker',
    method: 'POST'
  })
};

export const workerUpload = () => {
  return axios.request({
    url: '/admin/worker/upload',
    method: 'POST'
  })
};
