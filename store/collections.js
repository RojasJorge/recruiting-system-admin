import {
  action,
  thunk
} from "easy-peasy";

import config from "../config";
import axios from "axios";
import {
  isEmpty,
  mapKeys,
  groupBy,
  remove,
  find
} from "lodash";
import "antd/lib/message/style/index.css";

const collections = {
  list: [],
  total: 0,
  loading: false,
  get: thunk(async (actions, payload) => {
    actions.switchLoading(true);
    await axios.get(`${config.app.api_url}/career`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': payload
        },
      })
      .catch(error => {
        console.log(error);
        actions.switchLoading(false);
      })
      .then(response => {
        // console.log('get careers:', response)
        typeof response !== "undefined" ? actions.fill(response.data) : null;
        actions.switchLoading(false);
      })
  }),
  update: thunk(async (actions, payload) => {

    const token = payload.token;
    delete payload.token;

    actions.switchLoading(true);
    await axios.put(`${config.app.api_url}/career`, JSON.stringify(payload), {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
      })
      .catch(error => {
        console.log(error);
        actions.switchLoading(false);
      })
      .then(response => {

        // console.log('responde from update::', response);

        typeof response !== "undefined" ? actions.get(token) : null;
        actions.switchLoading(false);
      })
  }),
  fill: action((state, payload) => {


    let items = payload.items;

    let _data = [];
    let _childs = [];

    mapKeys(groupBy(items, 'parent'), (value, key) => {
      /** Find each parent */
      const findParent = find(items, (o) => o.id === key);

      if (findParent) {
        /** To compare */
        _data.push(value[0]);

        /** Attach to each parent */
        findParent.children = value;

        /** To compare on level 0 */
        _childs.push(findParent);
      }
    });

    remove(items, (o) => {
      return find(_data, (c) => c.id === o.id) ? o : null;
    });

    _childs.reduce((accumulator, current, index, arr) => {
      remove(items, (o) => {
        return find(current.children, (c) => c.id === o.id) ? o : null;
      });
    }, []);

    state.list = items;
    state.total = payload.total;
  }),
  prepare: action((state, payload) => {
    state.list = payload.data.items;
    state.total = payload.data.total;
  }),
  switchLoading: action((state, payload) => {
    state.loading = payload;
  })
};

export default collections;