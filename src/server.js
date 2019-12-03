// dependencias
import express from 'express'
import bodyParser from 'body-parser'
require('dotenv').config()

const NODE_ENV = process.env.NODE_ENV || 'dev'
const debug = require('debug')('romero:app')

// rotas
import routes from './routes'

export class Server {
  app = express()
  port = process.env.PORT

  setupConfig () {
    if (NODE_ENV === 'dev') {
      this.app.use(require('morgan')('combined'));
    }

    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))
  }

  startup() {
    this.setupConfig()
    this.setupRoutes()

    this.app.listen(this.port, () => debug(`Romero listening on port ${this.port}!`))
  }

  setupRoutes() {
    this.app.use('/', routes)
  }
}
