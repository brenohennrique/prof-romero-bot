import ConnectionProxy from '../services/connectionProxy'

export const getUsers = (email = null, tech) => {
  const connectionProxy = new ConnectionProxy(email)
  return new Promise ((resolve, reject) => {
    connectionProxy.http.get(`/v1/techs/users?q=${tech}`).then(({ data }) => {
      resolve({ data })
    }).catch(error => {
        reject(error)
      })
  })
}
