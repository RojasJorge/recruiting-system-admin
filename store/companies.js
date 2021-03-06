import { action, thunk } from 'easy-peasy';
import { orderBy } from 'lodash';
import axios from 'axios';

export default {
  company: {
    items: [],
    total: 0
  },
  list: [],
  total: 0,
  loading: false,

  /**
   * Get all collections.
   */
  get: thunk(async (actions, payload) => {
    actions.switchLoading(true);

    /** Extract token and id */
    const { token, id } = payload;

    /** Delete special fiels from payload to use as query */
    delete payload.token;
    delete payload.id;

    /** Prepare query params */
    const params = id ? `/${id}` : '';

    await axios
      .get(`${process.env.API_URL}/company${params}`, {
        params: payload,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
      .catch(error => {
        console.log(error);
        actions.switchLoading(false);
      })
      .then(response => {
        typeof response !== 'undefined'
          ? actions.fill({
              data: response.data,
              type: id ? false : true,
            })
          : null;
        actions.switchLoading(false);
      });
  }),

  /**
   * Update sigle or batch
   */
  update: thunk(async (actions, payload) => {
    actions.switchLoading(true);

    const token = payload.token;
    const type = payload.type;
    delete payload.token;
    delete payload.type;

    /** Send request */
    await axios
      .put(`${process.env.API_URL}/${type}`, JSON.stringify(payload), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
      .catch(error => {
        console.log(error);
        actions.switchLoading(false);
      })
      .then(response => {
        actions.switchLoading(false);
        return;
      });
  }),

  /**
   * Filter the colection
   */

  fill: action((state, payload) => {
    if (payload.type) {
      state.list = orderBy(payload.data.items, ['name', 'created_at'], ['asc', 'desc']);
      state.total = payload.data.total;
    } else {
      state.company = payload.data;
    }
  }),

  /**
   * Switch loading on pages
   */
  switchLoading: action((state, payload) => {
    state.loading = payload;
  }),
};
