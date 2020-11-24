import { defineAbility } from '@casl/ability';
import store from './store';

const ability = _ =>
  defineAbility((can, cannot) => {
    let scope = 'guest';
    const user = store.getState().auth.user;

    if (user) scope = user.scope[0];

    switch (scope) {
      case 'umana':
        can('read', ['USERS', 'CATALOGS', 'SPECIAL_ALERTS', 'PROFILE', 'REQUESTS_MENU']);

        can('view', ['MAIN_LAYOUT', 'LOGIN', 'COMPANIES', 'JOBS', 'REQUESTS_ADMIN_VIEW', 'REQUEST_UPDATE', 'COMPANY_INFO_BLOCK', 'MATCH_SCORE_VIEW', 'ALL_MENUS', 'CONTACT_CANDIDATE_BTN', 'ALL_JOBS']);

        can('edit', ['USERS', 'JOBS', 'COMPANIES', 'UPDATE_SINGLE_REQUEST']);
        can('add', ['COMPANIES', 'JOBS']);
        break;
      case 'company':
        can('read', ['USERS', 'SPECIAL_ALERTS', 'REQUESTS_MENU']);
        can('view', ['MAIN_LAYOUT', 'LOGIN', 'REQUESTS_ADMIN_VIEW', 'REQUEST_UPDATE', 'COMPANY_INFO_BLOCK', 'MATCH_SCORE_VIEW', 'CONTACT_CANDIDATE_BTN']);
        can('edit', ['USERS', 'JOBS', 'COMPANIES', 'UPDATE_SINGLE_REQUEST']);
        can('add', ['COMPANIES', 'JOBS']);

        break;

      case 'candidate':
        can('read', ['USERS', 'REQUESTS_MENU']);
        can('view', ['MAIN_LAYOUT', 'LOGIN', 'JOBS', 'COMPANIES', 'OWN_REQUESTS', 'COMPANY_INFO_BLOCK', 'ALL_JOBS']);
        can('apply', ['JOBS']);
        cannot('view', ['REQUESTS_ADMIN_VIEW']);

        break;
      case 'guest':
        can('guest', ['JOBS', 'ALL_JOBS']);
        break;

      default:
        can('view', ['LOGIN']);
        break;
    }
  });

export default ability;
