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

  getIssues (options = { limit: 2 }) {
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

  getIssueById (id, params = {}) {
    return new Promise((resolve, reject) => {
      this.redmine.get_issue_by_id(id, params, (error, data) => {
        if (error) {
          reject(error)
        } else {
          resolve(data)
        }
      })
    })
  }

  createIssue (subject) {
    return new Promise((resolve, reject) => {
      const options = {
        issue: {
          project_id: 1,
          tracker_id: 2,
          author_id: 2,
          subject
        }
      }

      this.redmine.create_issue(options, (error, data) => {
        if (error) {
          reject(error)
        } else {
          resolve(data)
        }
      })
    })
  }

  getUsers (options = { status: 1 }) {
    return new Promise((resolve, reject) => {
      this.redmine.users(options, (error, data) => {
        if (error) {
          reject(error)
        } else {
          resolve(data)
        }
      })
    })
  }

  // Funcoes a analizar

  getCustomFields () {
    return new Promise((resolve, reject) => {
      this.redmine.custom_fields((error, data) => {
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
