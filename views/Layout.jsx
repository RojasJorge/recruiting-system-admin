import { useEffect, useState } from "react";
import Head from "next/head";
import config from "../config";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Icon } from "antd";
import MainHeader from "../components/structure/Header";
import ViewTools from "../components/Misc/ViewToolsMenu";
import Login from "../components/user/Login";
import PageLoader from "../components/Misc/PageLoader";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import "antd/dist/antd.css";
import "../assets/css/global.scss";

const Layout = ({ children, title }) => {
  /** Page loaders */
  const [loading, switchLoader] = useState(true);
  const [fullScreen, switchFullScreen] = useState(false);

  const mloading = useStoreState(state => state.users.loading);

  /** Get auth global state */
  const auth = useStoreState(state => state.auth);

  /** Get global actions */
  const keepAuth = useStoreActions(actions => actions.auth.grantAccess);
  const refresh = useStoreActions(actions => actions.auth.refreshToken);

  useEffect(() => {
    /** Parse user & token from localStorage */
    let user = JSON.parse(localStorage.getItem("eUser"));
    const token = localStorage.getItem("eToken");

    /** Check if valid */
    if (token && user) {
      user.token = token;
      keepAuth(user);

      /** Refresh token on window focused */
      window.addEventListener("focus", async () => {
        await refresh(token);
        window.removeEventListener("focus", () => {});
      });
    } else {
      window.removeEventListener("focus", () => {});
    }

    /** Reset loader */
    switchLoader(false);
  }, []);

  return auth.token && auth.user ? (
    <div className="app">
      <Head>
        <title>{title + config.app.title}</title>
      </Head>
      <MainHeader />
      <div className="app--contents">
        <ViewTools
          fullScreen={fullScreen}
          switchFullScreen={switchFullScreen} />
        <div className={fullScreen ? 'container-fluid' : 'container'}>{children}</div>
      </div>
      <PageLoader active={mloading} />
    </div>
  ) : loading ? (
    <div className="app--spinner animated fadeIn">
      <Icon style={{ fontSize: 60 }} type="sync" spin />
    </div>
  ) : (
    <Login />
  );
};

export default Layout;
