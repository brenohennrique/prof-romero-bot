import ConnectionProxy from '../services/connectionProxy'

export const getUsers = (email = null, project) => {
  const connectionProxy = new ConnectionProxy(email)
  return new Promise ((resolve, reject) => {
    connectionProxy.http.get(`/v1/projects/users?q=${project}`).then(({ data }) => {
      resolve({ data })
    }).catch(error => {
        reject(error)
      })
  })
}
