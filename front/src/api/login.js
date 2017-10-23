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
