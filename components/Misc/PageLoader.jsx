import { Icon } from "antd";

const PageLoader = ({ active }) =>
  active ? (
    <div className="app--page-loader">
      <Icon type="sync" spin />
    </div>
  ) : null;

export default PageLoader;
