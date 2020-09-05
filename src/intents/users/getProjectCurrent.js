// dependencias
import slack from 'slack'
import * as API from '../../queries'
require('dotenv').config()

const debug = require('debug')('romero:intent:users:getProjectCurrent')
let token = process.env.SLACK_BOT_TOKEN

const getProjectCurrent = (agent, _params) => {
  return new Promise((resolve, reject) => {
    const { person } = agent.parameters

    slack.users.identity({ token }).then(result => {
      API.users.getProjectCurrent(result.user.email, person).then(({ data }) => {
        const eventFollowUp = {
          name: 'event_response_current_project',
          parameters: {
            project_name: data.project_name
          },
          languageCode: 'pt-br'
        }

        agent.setFollowupEvent(eventFollowUp)
        resolve()
      })
        .catch(error => {
          debug('Error find project current for user', error)
          reject(error)
        })
    }, error => {
      debug('Error in identify user!', error)
      reject(error)
    })
  })
}

export default getProjectCurrent
