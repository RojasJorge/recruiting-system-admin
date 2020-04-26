import { useEffect, useState } from 'react';
import Head from 'next/head';
import config from '../config';
import { useStoreState, useStoreActions } from 'easy-peasy';
import MainHeader from '../components/structure/Header';
// import ViewTools from "../components/Misc/ViewToolsMenu";
import Login from '../components/user/Login';
import PageLoader from '../components/Misc/PageLoader';
import PropTypes from 'prop-types';
import esEs from 'antd/lib/locale-provider/es_ES';
import { SyncOutlined } from '@ant-design/icons';
import { ConfigProvider } from 'antd';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import '../assets/css/global.scss';

const Layout = ({ children, title, className }) => {
  /** Page loaders */
  const [loading, switchLoader] = useState(true);
  const [fullScreen, switchFullScreen] = useState(false);

  const mloading = useStoreState(state => state.users.loading);

  /** Get auth global state */
  const auth = useStoreState(state => state.auth);

  /** Get global actions */
  const keepAuth = useStoreActions(actions => actions.auth.grantAccess);

  useEffect(() => {
    /** Parse user & token from localStorage */
    let user = JSON.parse(localStorage.getItem('eUser'));
    const token = localStorage.getItem('eToken');

    /** Check if valid */
    if (token && user) {
      user.token = token;
      keepAuth(user);
    }

    /** Reset loader */
    switchLoader(false);
  }, []);

  return auth.token && auth.user ? (
    <ConfigProvider locale={esEs}>
      <div className={className}>
        <Head>
          <title>{title + config.app.title}</title>
        </Head>
        <MainHeader />
        <div className="app--contents umana">
          {/* <ViewTools
          fullScreen={fullScreen}
          switchFullScreen={switchFullScreen}
        /> */}
          <div className={fullScreen ? 'container-fluid' : 'container umana-layout'}>
            {children}
          </div>
        </div>
        <PageLoader active={mloading} />
      </div>
    </ConfigProvider>
  ) : loading ? (
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
