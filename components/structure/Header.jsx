import { useStoreState } from "easy-peasy";
import MainMenu from "./MainMenu";

const MainHeader = () => {
  const user = useStoreState(state => state.auth.user);
  return (
    <header className="app--header">
      <MainMenu />
    </header>
  );
};

export default MainHeader;
