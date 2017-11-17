import fetch from '@/utils/fetch'

export function getList(params) {
  return fetch({
    url: '/table/list',
    method: 'get',
    params
  })
}

export function getBomList() {
  return fetch({
    url: '/api/bomlist',
    method: 'get'
  })
}

export function delBom(token,id) {
  return fetch({
    url: '/api/delbom',
    method: 'post',
    data: {
      token,
      id
    }
  })
}

export function upBom(token,form) {
  return fetch({
    url: '/api/upbom',
    method: 'post',
    data: {
      token,
      form
    }
  })
}

export function SearchBomByMfrValue(MfrValue) {
  return fetch({
    url: '/api/findbymfrvalue',
    method: 'get',
    params: {
		MfrValue
    }
  })
}

export function SearchBomByEncodeNum(EncodeNum) {
  return fetch({
    url: '/api/findbyencodenum',
    method: 'get',
    params: {
		EncodeNum
    }
  })
}