import { action, thunk } from 'easy-peasy';
import { orderBy } from 'lodash';
import axios from 'axios';

export default {
  job: null,
  list: [],
  total: 0,

  /**
   * Filter the colection
   */

  fill: action((state, payload) => {
    
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
  }),
};
