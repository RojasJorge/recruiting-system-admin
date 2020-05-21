import { defineAbility } from '@casl/ability'

const scope = 'umana'

export default defineAbility(can => {
  switch (scope) {
    case 'umana':
      can('read', ['USERS', 'CATALOGS', 'SPECIAL_ALERTS'])
      can('view', ['LOGIN'])
      can('edit', ['USERS'])
      break

    case 'candidate':
      can('read', ['USERS'])
      can('view', ['LOGIN'])
      break

    default:
      break
  }
})