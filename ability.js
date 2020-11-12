import { defineAbility } from '@casl/ability'
import store from './store'

const ability = _ =>
  defineAbility((can, cannot) => {
    
    let scope = 'guest'
    const user = store.getState().auth.user
    
    if(user) scope =  user.scope[0]

    switch (scope) {
      case 'umana':
        can('read', ['USERS', 'CATALOGS', 'SPECIAL_ALERTS', 'PROFILE'])
        
        can('view', [
          'MAIN_LAYOUT',
          'LOGIN',
          'COMPANIES',
          'JOBS',
          'REQUESTS_ADMIN_VIEW',
          'REQUEST_UPDATE',
          'COMPANY_INFO_BLOCK'
        ])
        
        can('edit', ['USERS', 'JOBS', 'COMPANIES', 'UPDATE_SINGLE_REQUEST'])
        can('view', ['ALL_MENUS'])
        can('add', ['COMPANIES', 'JOBS'])
        break
      case 'company':
        can('read', ['USERS', 'SPECIAL_ALERTS'])
        can('view', ['MAIN_LAYOUT', 'LOGIN', 'REQUESTS_ADMIN_VIEW', 'REQUEST_UPDATE', 'COMPANY_INFO_BLOCK'])
        can('edit', ['USERS', 'JOBS', 'COMPANIES', 'UPDATE_SINGLE_REQUEST'])
        can('add', ['COMPANIES', 'JOBS'])

        break

      case 'candidate':
        can('read', ['USERS'])
        can('view', ['MAIN_LAYOUT', 'LOGIN', 'JOBS', 'COMPANIES', 'OWN_REQUESTS', 'COMPANY_INFO_BLOCK'])
        can('apply', ['JOBS'])
        cannot('view', ['REQUESTS_ADMIN_VIEW'])

        break
      case 'guest':
        can('guest', ['JOBS'])
        break

      default:
        can('view', ['LOGIN'])
        break
    }
  })

export default ability
