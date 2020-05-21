import {
  action,
  thunk
} from 'easy-peasy'

import {
  message
} from "antd"

import Router from 'next/router'
import config from '../config'
import axios from 'axios'

const auth = {
  user: null,
  token: null,
  loading: false,
  updateToken: action((state, payload) => {
    state.token = payload
    localStorage.setItem('uToken', payload)
  }),
  refreshToken: thunk(async (actions, payload) =>
    await axios.post(`${config.app.api_url}/refresh`, JSON.stringify({}), {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': payload
      },
    })
      .catch(error => {
        localStorage.removeItem('uToken')
        localStorage.removeItem('uUser')
        this.state ? this.state.USER.auth.token = '' : null
      })
      .then(response => actions.updateToken(response.data))),
  grantAccess: action((state, payload) => {

    const token = payload.token
    delete payload.token

    /** Set localStorage */
    localStorage.setItem('uUser', JSON.stringify(payload))
    localStorage.setItem('uToken', token)

    /** Set global user info */
    state.user = payload
    state.token = token
  }),

  /** 
   * The login action
   */
  login: thunk(async (actions, payload) =>
    await axios.post(config.app.api_url + '/login', JSON.stringify(payload), {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        actions.grantAccess(response.data)
        if (Router.pathname === '/login')
          Router.push('/')
      })
      .catch(error => {
        console.log(error)
        message.error("Ah ocurrido un error, intente de nuevo.")
      })),
  logout: action(state => {
    state.user = null
    state.token = null
    localStorage.removeItem('uToken')
    localStorage.removeItem('uUser')
    Router.push("/")
  })
}

export default auth