import { defineAbility } from '@casl/ability';

const ability = scope =>
  defineAbility(can => {
    const role = scope ? scope[0] : 'guest';

    switch (role) {
      case 'umana':
        can('read', ['USERS', 'CATALOGS', 'SPECIAL_ALERTS', 'PROFILE']);
        can('view', ['MAIN_LAYOUT', 'LOGIN', 'COMPANIES', 'JOBS']);
        can('edit', ['USERS', 'JOBS', 'COMPANIES']);
        can('view', ['ALL_MENUS']);
        can('add', ['COMPANIES', 'JOBS']);
        break;
      case 'company':
        can('read', ['USERS', 'SPECIAL_ALERTS']);
        can('view', ['MAIN_LAYOUT', 'LOGIN']);
        can('edit', ['USERS', 'JOBS', 'COMPANIES']);
        can('add', ['COMPANIES', 'JOBS']);

        break;

      case 'candidate':
        can('read', ['USERS']);
        can('view', ['MAIN_LAYOUT', 'LOGIN', 'JOBS', 'COMPANIES']);
        can('apply', ['JOBS']);
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
