import { useEffect } from "react";
import { StoreProvider } from "easy-peasy";
import Router from "next/router";
import store from "../../store/store";
import Layout from "../../views/Layout";
import "antd/lib/select/style/index.css";

const Admin = _ => {
  useEffect(() => {
    console.log('Router on admin:', Router)
    if (localStorage.getItem("eToken")) {
      // Router.push("/login");
    }
  }, []);

  return (
    <StoreProvider store={store}>
      <Layout title="Tablero"></Layout>
    </StoreProvider>
  );
};

export default Admin;
