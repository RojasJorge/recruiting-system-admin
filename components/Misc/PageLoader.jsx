import { SyncOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

const PageLoader = ({ active }) =>
  active ? (
    <div className="app--page-loader">
      <SyncOutlined spin />
    </div>
  ) : null

PageLoader.propTypes = {
  active: PropTypes.bool
}

PageLoader.defaultProps = {
  active: false
}

export default PageLoader
