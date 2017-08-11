import axios from 'axios';

const api = process.env.OSTHUS_API_URL || 'http://localhost:5353/v1/first'

let token = localStorage.token

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getUsers = (pageSize, page, sorted, filtered) =>{
  var params = {}
  params.pageSize = pageSize || 10;
  params.page = page || 1;
  params.sorted = sorted || [];
  params.filtered = filtered || [];
  let url = window.osthus.url('/users', params); 
  return axios.get(url,{
    headers: { Authorization: 'Bearer ' + token }
  }).then(res => {
    return res.data;
  })
}

export const getAll = () =>{
  return axios.get(`${api}/users`).then(res => {
    return res.data;
  })
}

export const remove = (id) =>{
    return axios.delete(`${api}/user/${id}`).then(res => {
      return res.data;
    })
  }

export const update = (body) =>{
    return axios.put(`${api}/user/${body.id}`, body).then(res => {
      return res.data;
    })
  }

export const create = (body) =>{
    return axios.post(`${api}/user`, body).then(res => {
      return res.data;
    })
  }

export const login = (body) =>{
  return axios.post(`${api}/login`, body).then(res => {
    return res.data;
  })
}

export const isAuthenticated = ()=> {
  return !!localStorage.getItem('token');
}