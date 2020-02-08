import Head from "next/head";
import { StoreProvider } from "easy-peasy";
import store from "../../store/store";
import Layout from "../../views/Layout";
import UserProfile from "../../components/user/profile/";
import "antd/lib/select/style/index.css";

const Profile = () => (
  <StoreProvider store={store}>
    <Layout title="Mi perfil">
      <UserProfile />
    </Layout>
  </StoreProvider>
);

export default Profile;
