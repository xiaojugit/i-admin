import axios from '@/libs/api.request'

export const getPics = (data) => {
  return axios.request({
    url: '/admin/pic/getPics',
    method: 'GET',
    data
  })
};

export const addPic = (data) => {
  return axios.request({
    url: '/admin/pic/addPic',
    method: 'POST',
    data
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
    data
  })
};
