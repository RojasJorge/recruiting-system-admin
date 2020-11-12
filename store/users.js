import {action} from 'easy-peasy'

export default {
  list: [],
  total: 0,
  loading: false,
  fill: action((state, payload) => {
    state.list = payload.data.items
    state.total = payload.data.total
  }),
  switchLoading: action((state, payload) => {
    state.loading = payload
  })
}
