import {
  defaultIntent
} from './fallback'

import {
  createIssue
} from './issue'

const injectParams = params => (
  fn => ( agent => fn(agent, params) )
)

const intentMap = (params = {}) => {
  const { displayName } = params
  let map = new Map()

  // issues
  map.set('create.issue.subject', injectParams(params)(createIssue))

  if (map.get(displayName) === undefined) {
    map.set(displayName, injectParams(params)(defaultIntent))
    return map
  } else {
    return map
  }
}

export default intentMap
