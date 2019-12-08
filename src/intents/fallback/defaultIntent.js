// dependencias
const debug = require('debug')('romero:intent:defaultIntent')

import RedmineHelper from '../../helpers/redmine'

const defaultIntent = (_agent, _params) => {
  return new Promise((resolve, reject) => {
    RedmineHelper.getIssues({ limit: 2 }).then(response => {
      console.log('===>')
      console.log(response)
      debug('Default Intent!')
      resolve()
    }, error => {
      console.log(error)
      reject(error)
    })
  })
}

export default defaultIntent
