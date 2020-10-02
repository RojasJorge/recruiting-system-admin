import { action, thunk } from 'easy-peasy';
import { orderBy } from 'lodash';
import axios from 'axios';

export default {
  job: null,
  list: [],
  total: 0,
  loading: false,

  /**
   * Filter the colection
   */

  fill: action((state, payload) => {
    
    state.loading = true
    
    localStorage.removeItem('Jobs');

    state.list = orderBy(payload.data.items, ['name', 'created_at'], ['asc', 'desc']);
    state.total = payload.data.total;

    localStorage.setItem(
      'Jobs',
      JSON.stringify({
        list: state.list,
        total: state.total,
      }),
    );
    
    state.logading = false
  }),

  /**
   * Switch loading on pages
   */
  switchLoading: action((state, payload) => {
    state.loading = payload;
  }),
};
