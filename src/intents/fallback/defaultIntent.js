// dependencias
const debug = require('debug')('romero:intent:defaultIntent')

import RedmineHelper from '../../helpers/redmine'

const defaultIntent = (_agent, _params) => {
  return new Promise((resolve, reject) => {
    debug('Default Intent!')
    RedmineHelper.getIssueById(3).then(response => {
      console.log('===>')
      console.log(response)
      resolve()
    }, error => {
      console.log(error)
      reject(error)
    })
  })
}

export default defaultIntent
