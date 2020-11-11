import {useEffect, useState} from 'react';
import Router from 'next/router';
import Head from 'next/head';
import {useStoreActions, useStoreState} from 'easy-peasy';
import MainHeader from '../components/structure/Header';
import PageLoader from '../components/Misc/PageLoader';
import PropTypes from 'prop-types';
import {delay, isEmpty} from 'lodash';
import {Spin} from 'antd';
import Login from "../components/user/Login";

const style = {
	width: '100%',
	height: '100vh',
	minHeight: '100vh',
	position: 'absolute !important',
	top: 0,
	left: 0,
	bottom: 0,
	right: 0,
	background: 'white',
	zIndex: 99999,
	display: 'flex',
	justifyContent: 'center',
	alignItem: 'center',
	opacity: .5
};

const Layout = ({children, title, className, containerClass}) => {
	
	const [fullScreen, switchFullScreen] = useState(false);
	const [appStatus, setAppStatus] = useState('ready')
	
	/** Get profile validator from store */
	const profile = useStoreState(state => state.profile);
	const verifyProfileStatus = useStoreActions(actions => actions.profile.verify);
	
	/**
	 * System collections
	 * State names (singular) = career, academic_level
	 */
	const catalogs = useStoreState(state => state.collections);
	const getCollections = useStoreActions(actions => actions.collections.get);
	
	// const mloading = useStoreState(state => state.users.loading);
	
	/** Get auth global state */
	const auth = useStoreState(state => state.auth);
	
	/** Get/Set catalogs */
	useEffect(() => {
		
		if (!auth.user) {
			setAppStatus('noauth')
		} else {
			delay(_ => {
				setAppStatus('ready')
			}, 1000)
		}
		
		if (isEmpty(catalogs.career) || isEmpty(catalogs.academic_level)) {
			getCollections({type: 'career'});
			getCollections({type: 'academic-level'});
		}
		
	}, [auth.user]);
	
	
	useEffect(() => {
		if (auth.user) {
			/** Check current profile status */
			verifyProfileStatus(auth.user.profile.fields);
			// delay(_ => {
			//
			// }, 1000);
		}
	}, [auth.user, profile]);
	
	
	return (
		<>
			{/*Display if !auth*/}
			{(appStatus === 'noauth' && !auth.user) && <Login/>}
			
			{
				/**
				 * Render contents
				 */
				(appStatus === 'ready' && auth.user && auth.token) && <div className={`${className} app theme-${auth.user.scope[0]} ${containerClass}`}>
					<Head>
						<title>{title + process.env.NEXT_PUBLIC_APP_TITLE}</title>
					</Head>
					<MainHeader layout="is-login"/>
					<div className={`app--contents umana-content-page is-login ${className}`}>
						<div className={fullScreen ? 'container-fluid' : 'umana-layout'}>{children}</div>
					</div>
				</div>
			}
		</>
	)
}

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
