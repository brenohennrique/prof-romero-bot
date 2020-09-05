import axios from 'axios'

const debug = require('debug')('romero:services:connectionProxy')
require('dotenv').config()

export default class ConnectionProxy {
  constructor (email = null) {
    this.http = axios.create({
      baseURL: process.env.BASE_URL_USER_TECH,
      timeout: 10000
    })
    this.configure(email)
  }

  configure = (email = null) => {
    this.http.interceptors.request.use(
      config => {
        return new axios.post(`${process.env.BASE_URL_USER_TECH}/v1/auth`, { email }).then(({ data }) => {
          if (data && data.token) {
            config.headers.Authorization = `Bearer ${data.token}`
          }

          config.headers.common['Cache-Control'] = 'no-cache'
          config.headers.get = {}
          config.headers.get['If-Modified-Since'] = '0'
          config.cache = false
          config.validateStatus = status => status >= 200 && status <= 300
          return Promise.resolve(config)
        })
        .catch(error => {
          debug('Error capture token!', error)
          return Promise.resolve(config)
        })
      },
      error => {
        return Promise.reject(error)
      })
  }

  setToken = (token) => {
    config.headers.Authorization = `Bearer ${token}`
  }
}
