import { defineAbility } from '@casl/ability';

let scope = 'candidate';

export default defineAbility(can => {
  switch (scope) {
    case 'umana':
      can('read', ['USERS', 'CATALOGS', 'SPECIAL_ALERTS']);
      can('view', ['LOGIN', 'COMPANIES', 'JOBS']);
      can('edit', ['USERS', 'JOBS', 'COMPANIES']);
      can('view', ['ALL_MENUS']);
      break;
    case 'company':
      can('read', ['USERS', 'SPECIAL_ALERTS']);
      can('view', ['LOGIN']);
      can('edit', ['USERS', 'JOBS', 'COMPANIES']);

      break;

    case 'candidate':
      can('read', ['USERS']);
      can('view', ['LOGIN', 'JOBS', 'COMPANIES']);
      break;

    default:
      break;
  }
});
