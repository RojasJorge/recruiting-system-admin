import { defineAbility } from '@casl/ability';

const ability = scope => defineAbility(can => {
  
  switch (scope[0]) {
    case 'umana':
      can('read', ['USERS', 'CATALOGS', 'SPECIAL_ALERTS', 'PROFILE']);
      can('view', ['MAIN_LAYOUT', 'LOGIN', 'COMPANIES', 'JOBS']);
      can('edit', ['USERS', 'JOBS', 'COMPANIES']);
      can('view', ['ALL_MENUS']);
      break;
    case 'company':
      can('read', ['USERS', 'SPECIAL_ALERTS']);
      can('view', ['MAIN_LAYOUT', 'LOGIN']);
      can('edit', ['USERS', 'JOBS', 'COMPANIES']);

      break;

    case 'candidate':
      can('read', ['USERS']);
      can('view', ['MAIN_LAYOUT', 'LOGIN', 'JOBS', 'COMPANIES']);
      break;

    default:
      can('view', ['LOGIN'])
      break;
  }
});

export default ability
