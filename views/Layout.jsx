import { useEffect, useState } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import { useStoreState, useStoreActions } from 'easy-peasy';
import MainHeader from '../components/structure/Header';
import Login from '../components/user/Login';
import PageLoader from '../components/Misc/PageLoader';
import PropTypes from 'prop-types';
import { SyncOutlined } from '@ant-design/icons';
import { isEmpty } from 'lodash';
// import { Can } from '../components/Can';

const Layout = ({ children, title, className, containerClass }) => {
  /** Page loaders */
  const [loading, switchLoader] = useState(true);
  const [fullScreen, switchFullScreen] = useState(false);

  /**
   * System collections
   * State names (singular) = career, academic_level
   */
  const catalogs = useStoreState(state => state.collections);
  const getCollections = useStoreActions(actions => actions.collections.get);

  /** Prevent crash with 'guest' as default scope */
  const [scopeState, setScope] = useState('guest');

  const mloading = useStoreState(state => state.users.loading);

  /** Get auth global state */
  const auth = useStoreState(state => state.auth);

  /** Get global actions */
  const keepAuth = useStoreActions(actions => actions.auth.grantAccess);

  /** Get/Set catalogs */
  useEffect(() => {
    if (isEmpty(catalogs.career) || isEmpty(catalogs.academic_level)) {
      getCollections({ type: 'career' });
      getCollections({ type: 'academic-level' });
    }
  }, []);

  useEffect(() => {
    /** Parse user & token from localStorage */
    let user = JSON.parse(localStorage.getItem('uUser'));
    const token = localStorage.getItem('uToken');
    const _scope = JSON.parse(localStorage.getItem('uScopes'));

    if (_scope) {
      setScope(_scope[0]);
    }

    if (!token) Router.replace('/');

    /** Check if valid */
    if (token && user) {
      user.token = token;
      keepAuth(user);
    }

    /** Reset loader */
    switchLoader(false);
  }, []);

  return auth.token && auth.user ? (
    <div className={`${className} theme-${scopeState} ${containerClass}`}>
      <Head>
        <title>{title + process.env.NEXT_PUBLIC_APP_TITLE}</title>
      </Head>
      <MainHeader layout="is-login" />
      <div className={`app--contents umana is-login ${className}`}>
        <div className={fullScreen ? 'container-fluid' : 'umana-layout'}>{children}</div>
      </div>
      <PageLoader active={mloading} />
    </div>
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
};

Layout.defaultProps = {
  children: <></>,
  title: '',
  className: 'app',
};

export default Layout;
