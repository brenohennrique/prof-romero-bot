import ConnectionProxy from '../services/connectionProxy'

export const getInfo = (email = null, user) => {
  const connectionProxy = new ConnectionProxy(email)
  return new Promise ((resolve, reject) => {
    connectionProxy.http.get(`/v1/users/info?q=${user}`).then(({ data }) => {
      resolve({ data })
    }).catch(error => {
        reject(error)
      })
  })
}

export const getTechs = (email = null, user) => {
  const connectionProxy = new ConnectionProxy(email)
  return new Promise ((resolve, reject) => {
    connectionProxy.http.get(`/v1/users/techs?q=${user}`).then(({ data }) => {
      resolve({ data })
    }).catch(error => {
        reject(error)
      })
  })
}

export const getProjects = (email = null, user) => {
  const connectionProxy = new ConnectionProxy(email)
  return new Promise ((resolve, reject) => {
    connectionProxy.http.get(`/v1/users/projects?q=${user}`).then(({ data }) => {
      resolve({ data })
    }).catch(error => {
        reject(error)
      })
  })
}

export const getProjectCurrent = (email = null, user) => {
  const connectionProxy = new ConnectionProxy(email)
  return new Promise ((resolve, reject) => {
    connectionProxy.http.get(`/v1/users/current_project?q=${user}`).then(({ data }) => {
      resolve({ data })
    }).catch(error => {
        reject(error)
      })
  })
}

export const getSkillSpecific = (email = null, user, skill) => {
  const connectionProxy = new ConnectionProxy(email)
  return new Promise ((resolve, reject) => {
    connectionProxy.http.get(`/v1/users/skill_specific?user=${user}&skill=${skill}`).then(({ data }) => {
      resolve({ data })
    }).catch(error => {
        reject(error)
      })
  })
}
