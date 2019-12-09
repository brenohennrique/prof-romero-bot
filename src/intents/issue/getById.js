// dependencias
const debug = require('debug')('romero:intent:issues:get_by_id')

import RedmineHelper from '../../helpers/redmine'

const getIssueById = (agent, _params) => {
  return new Promise((resolve, reject) => {
    const { id } = agent.parameters

    RedmineHelper.getIssueById(id).then(response => {
      const eventGetById = {
        name: 'EVENT_ISSUE_STATUS',
        parameters: {
          status: response.issue.status.name
        },
        languageCode: 'pt-br'
      }

      agent.setFollowupEvent(eventGetById)
      resolve()
    }, error => {
      debug('Erro ao buscar por tarefa baseado no id!', error)
      reject(error)
    })
  })
}

export default getIssueById
