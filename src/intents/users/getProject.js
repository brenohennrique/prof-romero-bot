// dependencias
import slack from 'slack'
import * as API from '../../queries'
require('dotenv').config()

const debug = require('debug')('romero:intent:users:getProjects')
let token = process.env.SLACK_BOT_TOKEN

function formatedMessage (data) {
  return new Promise((resolve) => {
    let list = ''

    data.forEach((item, index, array) => {
      if (index + 1 === array.length && array.length > 1) {
        list += ` e ${item.name}`
      } else if (index === 0) {
        list += `${item.name}`
      } else {
        list += `, ${item.name}`
      }
    })

    resolve(list)
  })
}

const getProjects = (agent, _params) => {
  return new Promise((resolve, reject) => {
    const { name } = agent.parameters.person

    slack.users.identity({ token }).then(result => {
      API.users.getProjects(result.user.email, name).then(({ data }) => {
        formatedMessage(data).then(list => {
          const eventFollowUp = {
            name: 'event_response_projects',
            parameters: {
              list: list
            },
            languageCode: 'pt-br'
          }

          agent.setFollowupEvent(eventFollowUp)
          resolve()
        })

      })
        .catch(error => {
          debug('Error find techs for user', error)
          reject('Teste')
        })
    }, error => {
      debug('Error in identify user!', error)
      reject(error)
    })
  })
}

export default getProjects
