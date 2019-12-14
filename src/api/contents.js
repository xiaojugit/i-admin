import axios from '@/libs/api.request'

export const uploadImage = (data) => {
  return axios.request({
    url: '/admin/upload',
    method: 'POST',
    data,
    // headers: {
    //   "Content-Type": "multipart/form-data"
    // }
  })
};

export const getPics = (data) => {
  return axios.request({
    url: '/admin/pic/getPics',
    method: 'GET',
    params: data
  })
};

export const addPic = (data) => {
  return axios.request({
    url: '/admin/pic/addPic',
    method: 'POST',
    data
  })
};

export const deletePic = (id) => {
  return axios.request({
    url: '/admin/pic/delete/' + id,
    method: 'DELETE'
  })
};

export const addArticle = (data) => {
  return axios.request({
    url: '/admin/article/addArticle',
    method: 'POST',
    data
  })
};

export const getArticles = (data) => {
  return axios.request({
    url: '/admin/article/getArticles',
    method: 'GET',
    params: data
  })
};

export const deleteArticle = (id) => {
  return axios.request({
    url: '/admin/article/delete/' + id,
    method: 'DELETE'
  })
};
