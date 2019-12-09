// dependencias
const debug = require('debug')('romero:intent:issues:priority')

import RedmineHelper from '../../helpers/redmine'

const priorityIssue = (agent, _params) => {
  return new Promise((resolve, reject) => {
    const { id } = agent.contexts[0].parameters

    RedmineHelper.getIssueById(id).then(response => {
      const eventPriority = {
        name: 'EVENT_ISSUE_PRIORITY',
        parameters: {
          priority: response.issue.priority.name
        },
        languageCode: 'pt-br'
      }

      agent.setFollowupEvent(eventPriority)
      agent.setContext({ name: 'find_issue_id', lifespan: 5 })
      resolve()
    }, error => {
      debug('Erro ao buscar por tarefa baseado no id!', error)
      reject(error)
    })
  })
}

export default priorityIssue
