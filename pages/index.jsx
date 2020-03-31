import { StoreProvider } from "easy-peasy";
import store from "../store/store";
import Home from "../components/Misc/Home";

const Index = _ => (
  <StoreProvider store={store}>
    <Home />
  </StoreProvider>
);

export default Index;
