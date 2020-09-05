// dependencias
import slack from 'slack'
import * as API from '../../queries'
require('dotenv').config()

const debug = require('debug')('romero:intent:users:getTechs')
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

const getTechs = (agent, _params) => {
  return new Promise((resolve, reject) => {
    const { name } = agent.parameters.person

    slack.users.identity({ token }).then(result => {
      API.users.getTechs(result.user.email, name).then(({ data }) => {
        formatedMessage(data).then(list => {
          const eventFollowUp = {
            name: 'event_response_skills',
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

export default getTechs
