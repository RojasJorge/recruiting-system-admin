import { defineAbility } from '@casl/ability';

const ability = scope =>
  defineAbility((can, cannot) => {
    const role = scope ? scope[0] : 'guest';

    switch (role) {
      case 'umana':
        can('read', ['USERS', 'CATALOGS', 'SPECIAL_ALERTS', 'PROFILE']);
        can('view', ['MAIN_LAYOUT', 'LOGIN', 'COMPANIES', 'JOBS', 'REQUESTS_ADMIN_VIEW', 'REQUEST_UPDATE']);
        can('edit', ['USERS', 'JOBS', 'COMPANIES', 'UPDATE_SINGLE_REQUEST']);
        can('view', ['ALL_MENUS']);
        can('add', ['COMPANIES', 'JOBS']);
        break;
      case 'company':
        can('read', ['USERS', 'SPECIAL_ALERTS']);
        can('view', ['MAIN_LAYOUT', 'LOGIN', 'REQUESTS_ADMIN_VIEW', 'REQUEST_UPDATE']);
        can('edit', ['USERS', 'JOBS', 'COMPANIES', 'UPDATE_SINGLE_REQUEST']);
        can('add', ['COMPANIES', 'JOBS']);

        break;

      case 'candidate':
        can('read', ['USERS']);
        can('view', ['MAIN_LAYOUT', 'LOGIN', 'JOBS', 'COMPANIES', 'OWN_REQUESTS']);
        can('apply', ['JOBS']);
        cannot('view', ['REQUESTS_ADMIN_VIEW']);
        
        break;
      case 'guest':
        can('apply', ['JOBS']);
        break;

      default:
        can('view', ['LOGIN']);
        break;
    }
  });

export default ability;
