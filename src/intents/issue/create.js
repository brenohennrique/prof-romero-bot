// dependencias
const debug = require('debug')('romero:intent:issues:create')

import RedmineHelper from '../../helpers/redmine'

const createIssue = (agent, _params) => {
  return new Promise((resolve, reject) => {
    const { subject } = agent.parameters

    RedmineHelper.createIssue(subject).then(response => {
      const eventCreate = {
        name: 'EVENT_CREATED_ISSUE',
        parameters: {
          id: response.issue.id
        },
        languageCode: 'pt-br'
      }

      agent.setFollowupEvent(eventCreate)
      resolve()
    }, error => {
      debug('Erro ao criar uma tarefa!', error)
      reject(error)
    })
  })
}

export default createIssue
