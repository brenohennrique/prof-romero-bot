// dependencias
const debug = require('debug')('romero:intent:issues:get_by_id')

import RedmineHelper from '../../helpers/redmine'

const getIssueById = (agent, _params) => {
  return new Promise((resolve, reject) => {
    const { id } = agent.parameters

    RedmineHelper.getIssueById(id).then(response => {
      let statusIssue = ''

      switch (response.issue.status.name) {
        case 'Nova':
          statusIssue = `é nova`
          break
        case 'Em andamento':
          statusIssue = `está em andamento`
          break
        case 'Resolvida':
          statusIssue = `está resolvida`
          break
        case 'Feedback':
          statusIssue = `é de feedback`
          break
        case 'Fechada':
          statusIssue = `está fechada`
          break
        case 'Rejeitada':
          statusIssue = `está rejeitada`
      }

      const eventGetById = {
        name: 'EVENT_ISSUE_STATUS',
        parameters: {
          status: statusIssue
        },
        languageCode: 'pt-br'
      }

      agent.setFollowupEvent(eventGetById)
      agent.setContext({ name: 'find_issue_id', lifespan: 5 })
      resolve()
    }, error => {
      debug('Erro ao buscar por tarefa baseado no id!', error)
      reject(error)
    })
  })
}

export default getIssueById
