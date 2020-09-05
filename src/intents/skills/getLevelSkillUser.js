// dependencias
import slack from 'slack'
import * as API from '../../queries'
require('dotenv').config()

const debug = require('debug')('romero:intent:skill:getLevelSkillUser')
let token = process.env.SLACK_BOT_TOKEN

const getLevelSkillUser = (agent, _params) => {
  return new Promise((resolve, reject) => {
    const { skill } = agent.contexts[0].parameters
    const { collaborator } = agent.contexts[1].parameters

    slack.users.identity({ token }).then(result => {
      API.users.getSkillSpecific(result.user.email, collaborator, skill).then(({ data }) => {
        let eventFollowUp = {}


        if (data && data.level_name === 'BÁSICO') {
          eventFollowUp = {
            name: 'event_response_know_skill_level_beginner',
            languageCode: 'pt-br'
          }

        } else if (data && data.level_name === 'INTERMEDIÁRIO') {
          eventFollowUp = {
            name: 'event_response_know_skill_level_Intermediary',
            languageCode: 'pt-br'
          }
        } else {
          eventFollowUp = {
            name: 'event_response_know_skill_level_expert',
            languageCode: 'pt-br'
          }
        }

        agent.setFollowupEvent(eventFollowUp)
        agent.setContext({ name: 'collaborator', lifespan: 1, parameters: { collaborator: collaborator, skill: skill } })
        resolve()
      })
        .catch(error => {
          debug('Error find skill level skill for user', error)
          reject(error)
        })
    }, error => {
      debug('Error in identify user!', error)
      reject(error)
    })
  })
}

export default getLevelSkillUser
