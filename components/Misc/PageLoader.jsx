import { Spin } from 'antd';
import PropTypes from 'prop-types';

const PageLoader = ({ active }) =>
  active ? (
    <div className="app--spinner animated fadeIn">
      <Spin tip="Cargando.." size="large" />
    </div>
  ) : null;

PageLoader.propTypes = {
  active: PropTypes.bool,
};

PageLoader.defaultProps = {
  active: false,
};

export default PageLoader;
