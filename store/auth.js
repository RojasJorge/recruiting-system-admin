import {
  action,
  thunk
} from "easy-peasy";

import {
  message
} from "antd";

import Router from "next/router";
import config from "../config";
import axios from "axios";
import "antd/lib/message/style/index.css";

const auth = {
  user: null,
  token: null,
  loading: false,
  updateToken: action((state, payload) => {
    state.token = payload;
    localStorage.setItem('eToken', payload);
  }),
  refreshToken: thunk(async (actions, payload) =>
    await axios.post(`${config.app.api_url}/refresh`, JSON.stringify({}), {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': payload
      },
    })
    .catch(error => {
      localStorage.removeItem('eToken');
      localStorage.removeItem('eUser');
      this.state.USER.auth.token = '';
    })
    .then(response => actions.updateToken(response.data))),
  grantAccess: action((state, payload) => {

    const token = payload.token;
    delete payload.token

    /** Set localStorage */
    localStorage.setItem('eUser', JSON.stringify(payload));
    localStorage.setItem('eToken', token);

    /** Set global user info */
    state.user = payload;
    state.token = token;
  }),
  login: thunk(async (actions, payload) =>
    await axios.post(config.app.api_url + '/login', JSON.stringify({
      email: payload.email.value,
      password: payload.password.value
    }), {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      actions.grantAccess(response.data)
      Router.push("/");
    })
    .catch(error => {
      console.log(error);
      message.error("Ah ocurrido un error, intente de nuevo.");
    })),
  logout: action(state => {
    state.user = null;
    state.token = null;
    localStorage.removeItem('eToken');
    localStorage.removeItem('eUser');
    Router.push("/");
  })
};

export default auth;