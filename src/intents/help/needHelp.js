// dependencias
import slack from 'slack'
import * as API from '../../queries'
require('dotenv').config()

const debug = require('debug')('romero:intent:help:needHelp')
let token = process.env.SLACK_BOT_TOKEN

const needHelp = (agent, _params) => {
  return new Promise((resolve, reject) => {
    const { skills } = agent.parameters

    slack.users.identity({ token }).then(result => {
      API.techs.getUsers(result.user.email, skills).then(({ data }) => {
        const eventFollowUp = {
          name: 'event_need_help_response',
          parameters: {
            collaborator: data.name,
            genre: data.gender_name === 'MASCULINO' ? 'ele' : 'ela'
          },
          languageCode: 'pt-br'
        }

        agent.setFollowupEvent(eventFollowUp)
        agent.setContext({ name: 'collaborator', lifespan: 1, parameters: { collaborator: data.name } })
        resolve()
      })
        .catch(error => {
          debug('Error find techs for user', error)
          reject(error)
        })
    }, error => {
      debug('Error in identify user!', error)
      reject(error)
    })
  })
}

export default needHelp
