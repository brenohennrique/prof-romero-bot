// dependencias
import slack from 'slack'
import * as API from '../../queries'
require('dotenv').config()

const debug = require('debug')('romero:intent:users:getWhatsapp')
let token = process.env.SLACK_BOT_TOKEN

const getWhatsapp = (agent, _params) => {
  return new Promise((resolve, reject) => {
    const { collaborator } = agent.contexts[0].parameters

    slack.users.identity({ token }).then(result => {
      API.users.getInfo(result.user.email, collaborator).then(({ data }) => {
        const eventFollowUp = {
          name: 'event_response_help_contact_whatsapp',
          parameters: {
            phone: data[0].whatsapp,
            genre: data[0].gender_name === 'MASCULINO' ? 'ele' : 'ela',
            tech_match: 'AWS',
            user: 'Adriane'
          },
          languageCode: 'pt-br'
        }

        agent.setFollowupEvent(eventFollowUp)
        resolve()
      })
        .catch(error => {
          debug('Error find whatsapp for user', error)
          reject('Teste')
        })
    }, error => {
      debug('Error in identify user!', error)
      reject(error)
    })
  })
}

export default getWhatsapp
