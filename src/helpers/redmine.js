import Redmine from 'node-redmine'

// protocol required in Hostname, supports both HTTP and HTTPS
const hostname = process.env.REDMINE_HOST
const config = {
  apiKey: process.env.REDMINE_APIKEY
}



class RedmineHelper {
  constructor () {
    this.redmine = new Redmine(hostname, config)
  }

  getIssues (options) {
    return new Promise((resolve, reject) => {
      this.redmine.issues(options, (error, data) => {
        if (error) {
          reject(error)
        } else {
          resolve(data)
        }
      })
    })
  }
}

export default new RedmineHelper()
