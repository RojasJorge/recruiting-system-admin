import { useEffect, useState } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import { useStoreState, useStoreActions } from 'easy-peasy';
import MainHeader from '../components/structure/Header';
import Login from '../components/user/Login';
import PageLoader from '../components/Misc/PageLoader';
import PropTypes from 'prop-types';
import { isEmpty, delay } from 'lodash';
import { Spin } from 'antd';

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
};

const Layout = ({ children, title, className, containerClass }) => {
  /** Page loaders */
  const [loading, switchLoader] = useState(true);
  const [fullScreen, switchFullScreen] = useState(false);

  /** Get profile validator from store */
  const profile = useStoreState(state => state.profile);
  const verifyProfileStatus = useStoreActions(actions => actions.profile.verify);

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
  }, [auth.user, profile]);

  if (auth.token && auth.user) {
    if (loading || isEmpty(catalogs.career) || isEmpty(catalogs.academic_level)) {
      return (
        <div className="app--spinner" style={style}>
          <Spin size="large" />
        </div>
      );
    } else {
      return (
        <div className={`${className} app theme-${auth.user.scope[0]} ${containerClass}`}>
          <Head>
            <title>{title + process.env.NEXT_PUBLIC_APP_TITLE}</title>
          </Head>
          <MainHeader layout="is-login" />
          <div className={`app--contents umana-content-page is-login ${className}`}>
            <div className={fullScreen ? 'container-fluid' : 'umana-layout'}>{children}</div>
          </div>

          <PageLoader active={mloading} />
        </div>
      );
    }
  }
  return <Login />;
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
