import { useEffect, useState } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import { useStoreState, useStoreActions } from 'easy-peasy';
import MainHeader from '../components/structure/Header';
import Login from '../components/user/Login';
import PageLoader from '../components/Misc/PageLoader';
import PropTypes from 'prop-types';
import { SyncOutlined } from '@ant-design/icons';
import { isEmpty, delay } from 'lodash';

const Layout = ({ children, title, className, containerClass }) => {
	/** Page loaders */
	const [loading, switchLoader] = useState(true);
	const [fullScreen, switchFullScreen] = useState(false);
	
	/** Get profile validator from store */
	const profile = useStoreState(state => state.profile)
	const verifyProfileStatus = useStoreActions(actions => actions.profile.verify)
	
	/**
	 * System collections
	 * State names (singular) = career, academic_level
	 */
	const catalogs = useStoreState(state => state.collections);
	const getCollections = useStoreActions(actions => actions.collections.get);
	
	const mloading = useStoreState(state => state.users.loading);
	
	/** Get auth global state */
	const auth = useStoreState(state => state.auth);
	
	/** Get/Set catalogs */
	useEffect(() => {
		if (isEmpty(catalogs.career) || isEmpty(catalogs.academic_level)) {
			getCollections({ type: 'career' });
			getCollections({ type: 'academic-level' });
		}
	}, []);
	
	useEffect(() => {
		if (!auth.user && !auth.token) {
			Router.replace('/');
		}
		
		/** Reset loader */
		switchLoader(false);
	}, [auth.user, auth.token]);
	
	useEffect(() => {
		if (auth.user) {
			/** Check current profile status */
			delay(_ => {
				verifyProfileStatus(auth.user.profile.fields);
			}, 1000);
		}
	}, [auth.user, profile])
	
	return (auth.token && auth.user && !mloading) ? (
		<>
			<div className={`${className} theme-${auth.user.scope[0]} ${containerClass}`}>
				<Head>
					<title>{title + process.env.NEXT_PUBLIC_APP_TITLE}</title>
				</Head>
				<MainHeader layout="is-login" />
				<div className={`app--contents umana is-login ${className}`}>
					<div className={fullScreen ? 'container-fluid' : 'umana-layout'}>
						{children}
					</div>
				</div>
				<PageLoader active={mloading} />
			</div>
		</>
	) : loading || isEmpty(catalogs.career) || isEmpty(catalogs.academic_level) ? (
		<div className="app--spinner animated fadeIn">
			<SyncOutlined style={{ fontSize: 60 }} spin />
		</div>
	) : (
		<Login />
	);
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
  containerClass: PropTypes.string,
};

Layout.defaultProps = {
  children: <div></div>,
  title: '',
  className: 'app',
  containerClass: 'umana-container',
};

export default Layout;
