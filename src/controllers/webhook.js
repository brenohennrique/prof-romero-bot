// dependencias
import { WebhookClient } from 'dialogflow-fulfillment'
const debug = require('debug')('romero:webhookController')

// intents
import intentMap from '../intents'

const WebhookController = {}

WebhookController.post = (req, res) => {
  const { originalDetectIntentRequest = {}, queryResult = {} } = req.body
  const { payload = {} } = originalDetectIntentRequest
  const { data = {} } = payload
  const { sender = {}, message = {} } = data
  const { intent = {} } = queryResult
  const { displayName = '' } = intent

  const agent = new WebhookClient({ request: req, response: res })

  agent.handleRequest(intentMap({ sender, message, displayName })).catch(err => {
    debug(`Failed handle request ${err}`)
  })
}

export default WebhookController
