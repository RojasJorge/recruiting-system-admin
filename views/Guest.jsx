import Proptypes  from 'prop-types';
import esEs from 'antd/lib/locale-provider/es_ES';
import { ConfigProvider } from 'antd';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import '../assets/css/global.scss';

const Guest = ({children, pageTitle, containerClass }) => {
  return(
    <ConfigProvider locale={esEs}>
  <div className={containerClass}>
    <div className="row">
    <h1>{pageTitle}</h1>
    </div>
    {children}
  </div>
  </ConfigProvider>
  )
}


Guest.propTypes = {
  children: Proptypes.node.isRequired,
  pageTitle: Proptypes.string,
  containerClass: Proptypes.string
}

Guest.defaultProps = {
  children: <div>Page is empty</div>,
  pageTitle: "container",
  containerClass: "portada"
}
export default Guest;