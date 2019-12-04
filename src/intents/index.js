import {
  defaultIntent
} from './fallback'

const injectParams = params => (
  fn => ( agent => fn(agent, params) )
)

const intentMap = (params = {}) => {
  const { displayName } = params
  let map = new Map()

  if (map.get(displayName) === undefined) {
    map.set(displayName, injectParams(params)(defaultIntent))
    return map
  } else {
    return map
  }
}

export default intentMap
