import {action, thunk} from 'easy-peasy';
import {message} from 'antd';
import Router from 'next/router';
import axios from 'axios';

// const base_url = process.env.NEXT_PUBLIC_APP_ENV === 'develop'
// 	? process.env.NEXT_PUBLIC_API_URL_DEVELOP
// 	: process.env.NEXT_PUBLIC_API_URL_PRODUCTION

export default {
	user: null,
	token: null,
	loading: false,
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
					localStorage.removeItem('uToken');
					localStorage.removeItem('uUser');
					this.state ? (this.state.USER.auth.token = '') : null;
				})
				.then(response => actions.updateToken(response.data)),
	),
	grantAccess: action((state, payload) => {
		const token = payload.token;
		delete payload.token;
		
		/** Set localStorage */
		localStorage.setItem('uUser', JSON.stringify(payload));
		localStorage.setItem('uScopes', JSON.stringify(payload.scope));
		localStorage.setItem('uToken', token);
		
		/** Set global user info */
		state.user = payload;
		state.token = token;
	}),
	
	/**
	 * The login action
	 */
	login: thunk(
		async (actions, payload) =>
			await axios
				.post(process.env.NEXT_PUBLIC_API_URL_PRODUCTION + '/login', JSON.stringify(payload), {
					headers: {
						'Content-Type': 'application/json',
					},
				})
				.then(response => {
					actions.grantAccess(response.data);
					if (Router.pathname === '/login' || Router.pathname === '/signup') Router.push('/admin');
				})
				.catch(error => {
					console.log(error);
					message.error('Ah ocurrido un error, intente de nuevo.');
				}),
	),
	logout: action(state => {
		state.user = null;
		state.token = null;
		state.scopes = null;
		localStorage.removeItem('uToken');
		localStorage.removeItem('uScopes');
		localStorage.removeItem('uUser');
		Router.push('/');
	}),
	
	
	/**
	 * Update user state
	 */
	updateStoreUser: action((state, payload) => {
		console.log('updateStoreUser | Payload:', payload)
		return
	})
};
