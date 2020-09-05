import {
  defaultIntent
} from './fallback'

import {
  getProjects,
  getLinkedin,
  getWhatsapp,
  getTechs,
  getSpecificEmployeeSkill,
  getProjectCurrent
} from './users'

import {
  needHelp
} from './help'

import {
  getLevelSkillUser
} from './skills'

const injectParams = params => (
  fn => ( agent => fn(agent, params) )
)

const intentMap = (params = {}) => {
  const { displayName } = params
  let map = new Map()

  map.set('projects', injectParams(params)(getProjects))
  map.set('need_help', injectParams(params)(needHelp))
  map.set('help_contact.yes.linkedin', injectParams(params)(getLinkedin))
  map.set('help_contact.yes.whatsapp', injectParams(params)(getWhatsapp))
  map.set('skills', injectParams(params)(getTechs))
  map.set('specific_employee_skill', injectParams(params)(getSpecificEmployeeSkill))
  map.set('know_skill_level.yes', injectParams(params)(getLevelSkillUser))
  map.set('current_project', injectParams(params)(getProjectCurrent))

  if (map.get(displayName) === undefined) {
    map.set(displayName, injectParams(params)(defaultIntent))
    return map
  } else {
    return map
  }
}

export default intentMap
