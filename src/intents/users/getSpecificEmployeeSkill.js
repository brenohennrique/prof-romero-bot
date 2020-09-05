// dependencias
import slack from 'slack'
import * as API from '../../queries'
require('dotenv').config()

const debug = require('debug')('romero:intent:users:getSpecficEmployee')
let token = process.env.SLACK_BOT_TOKEN

const getSpecficEmployee = (agent, _params) => {
  return new Promise((resolve, reject) => {
    const { person, skills } = agent.parameters

    slack.users.identity({ token }).then(result => {
      API.users.getSkillSpecific(result.user.email, person.name, skills).then(({ data }) => {
        let eventFollowUp = {}

        if (data && data.gender_name) {
          eventFollowUp = {
            name: 'event_response_positive_specific_employee_skill',
            parameters: {
              user: 'Adriane',
              genre: data.gender_name === 'MASCULINO' ? 'ele' : 'ela'
            },
            languageCode: 'pt-br'
          }
          agent.setContext({ name: 'collaborator', lifespan: 1, parameters: { collaborator: person.name } })
          agent.setContext({ name: 'skill', lifespan: 1, parameters: { skill: skills } })
        } else {
          eventFollowUp = {
            name: 'event_response_negative_specific_employee_skill',
            parameters: {
              user: 'Adriane'
            },
            languageCode: 'pt-br'
          }
        }

        agent.setFollowupEvent(eventFollowUp)
        resolve()
      })
        .catch(error => {
          debug('Error find skill specific for user', error)
          reject(error)
        })
    }, error => {
      debug('Error in identify user!', error)
      reject(error)
    })
  })
}

export default getSpecficEmployee
