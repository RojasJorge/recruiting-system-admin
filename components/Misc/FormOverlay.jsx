import PropTypes from 'prop-types'

const FormOverlay = ({active}) => {
	
	return (
		<div className={`form--overlay ${active && 'active'}`}/>
	)
}

FormOverlay.propTypes = {
	active: PropTypes.bool
}

FormOverlay.defaultProps = {
	active: false
}

export default FormOverlay
