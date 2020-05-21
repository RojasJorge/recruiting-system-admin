import Proptypes from 'prop-types'

const Guest = ({ children, pageTitle, containerClass }) => {
  return (
    <div className={containerClass}>
      <div className="row">
        <h1>{pageTitle}</h1>
      </div>
      {children}
    </div>
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

export default Guest