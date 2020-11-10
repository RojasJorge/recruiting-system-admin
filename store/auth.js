import { action, thunk } from 'easy-peasy';
import Router from 'next/router';
import axios from 'axios';
import store from './index';

export default {
  user: null,
  token: null,
  loading: false,
  error: 0,
  updateToken: action((state, payload) => {
    state.token = payload;
    localStorage.setItem('uToken', payload);
  }),
  refreshToken: thunk(
    async (actions, payload) =>
      await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL_PRODUCTION}/refresh`, JSON.stringify({}), {
          headers: {
            'Content-Type': 'application/json',
            Authorization: payload,
          },
        })
        .catch(error => {
          // localStorage.removeItem('uToken');
          // localStorage.removeItem('uUser');
          this.state ? (this.state.USER.auth.token = '') : null;
        })
        .then(response => actions.updateToken(response.data)),
  ),
  grantAccess: action((state, payload) => {
    const token = payload.token;
    delete payload.token;

    /** Set localStorage */
    // localStorage.setItem('uUser', JSON.stringify(payload));
    // localStorage.setItem('uScopes', JSON.stringify(payload.scope));
    // localStorage.setItem('uToken', token);

    /** Set global user info */
    state.user = payload;
    state.token = token;
  }),
  handlenError: action((state, payload) => {
    /** Set global user info */
    state.error = payload;
  }),

  /**
   * The login action
   */
  login: thunk(
    async (actions, {data, pathname}) =>
      await axios
        .post(process.env.NEXT_PUBLIC_API_URL_PRODUCTION + '/login', JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          actions.grantAccess(response.data);
          actions.handlenError(0);
  
          // const pathname = Router.router.pathname.split('/')
          //
          console.log('Pathname:', pathname)
          if(pathname.length <= 2) {
            if (response.data.scope[0] === 'company' || response.data.scope[0] === 'umana' || response.data.scope[0] !== 'candidate') {
              location.href = '/admin/requests';
              // Router.push('/admin/requests')
            } else {
              location.href = '/admin/welcome';
              // Router.puth('/admin/welcome')
            }
          }
          
        })
        .catch(error => {
          // console.log(error);
          actions.handlenError(error.response.status);
        }),
  ),
  logout: action(state => {
    state.user = null;
    state.token = null;
    state.scopes = null;
    
    store.persist.clear().then(() => {
      console.log('Persisted states has been removed')
    })
    
    Router.push('/')
  }),

  /**
   * Update user state
   */
  updateProfile: action((state, payload) => {
    /** Update global state */
    state.user.profile.fields[payload.type] = payload.fields
  }),
};
