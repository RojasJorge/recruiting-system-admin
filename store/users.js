import {
  action,
  thunk
} from "easy-peasy";

import config from "../config";
import axios from "axios";

const users = {
  list: [],
  total: 0,
  loading: false,
  get: thunk(async (actions, payload) => {
    actions.switchLoading(true);
    await axios.get(`${config.app.api_url}/user`, {
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

        typeof response !== "undefined" ? actions.fill(response) : null;
        actions.switchLoading(false);
      })
  }),
  fill: action((state, payload) => {
    state.list = payload.data.items;
    state.total = payload.data.total;
  }),
  switchLoading: action((state, payload) => {
    state.loading = payload;
  })
};

export default users;
