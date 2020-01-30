import { StoreProvider } from "easy-peasy";
import store from "../../store/store";
import Layout from "../../views/Layout";
import UserProfile from "../../components/user/profile/";

const Profile = () => (
  <StoreProvider store={store}>
    <Layout>
      <UserProfile />
    </Layout>
  </StoreProvider>
);

export default Profile;
