import fetch from '@/utils/fetch'

export function login(username, password) {
  return fetch({
    url: '/api/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return fetch({
    url: '/api/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return fetch({
    url: '/api/logout',
    method: 'post',
  })
}

export function getAllUser(token) {
  return fetch({
    url: '/api/getalluser',
    method: 'get',
    params: { token }
  })
}

export function addUser(token,username,password) {
  return fetch({
    url: '/api/adduser',
    method: 'post',
    data: {
      username,
      password
    },
    params: { token }
  })
}

export function upPasswd(username,newpassword) {
  return fetch({
    url: '/api/uppasswd',
    method: 'post',
    data: {
      username,
      newpassword
    }
  })
}

export function delUser(username) {
  return fetch({
    url: '/api/deluser',
    method: 'post',
    data: {
      username
    }
  })
}