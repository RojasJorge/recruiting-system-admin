import { StoreProvider } from "easy-peasy";
import store from "../store/store";
import SignupForm from "../components/user/Signup";

const Register = () => 
<StoreProvider store={store}>
<SignupForm />
</StoreProvider>

export default Register;
