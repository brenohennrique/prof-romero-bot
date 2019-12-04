// dependencias
import basicAuth from 'express-basic-auth'
require('dotenv').config()


const users = {}

users[process.env.WEBHOOK_AUTH_USER] = process.env.WEBHOOK_AUTH_PASSWORD

const unauthorizedResponse = (req) => {
  return req.auth
    ? ('Credentials user or password rejected')
    : 'No credentials provided'
}

const WebhookAuth = basicAuth({ users, unauthorizedResponse })

export default WebhookAuth
