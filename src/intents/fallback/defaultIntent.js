// dependencias
const debug = require('debug')('romero:intent:defaultIntent')

const defaultIntent = (agent, params) => {
  return new Promise((resolve, _reject) => {
    debug('Default Intent!')
    resolve()
  })
}

export default defaultIntent
