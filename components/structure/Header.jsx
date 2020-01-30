import { useStoreState } from "easy-peasy";
import { Icon } from "antd";
import "antd/lib/icon/style/index.css";

const MainHeader = () => {
  const user = useStoreState(state => state.auth.user);
  return (
    <header>
      
    </header>
  );
};

export default MainHeader;
