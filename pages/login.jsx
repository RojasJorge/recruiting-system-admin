import { StoreProvider } from "easy-peasy";
import store from "../store/store";
import Login from "../components/user/Login";

const LoginPage = _ => (
  <StoreProvider store={store}>
    <Login />
  </StoreProvider>
);

export default LoginPage;
