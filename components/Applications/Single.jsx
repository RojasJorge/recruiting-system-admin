import PropTypes from 'prop-types'
import {isEmpty} from 'lodash'

const Single = ({record}) => {
	
	// if(isEmpty(record)) {
	//
	// }
	
	return(
		<>
		<pre>{JSON.stringify(record, false, 2)}</pre>
		</>
	)
}

Single.propTypes = {
	record: PropTypes.object,
}

Single.defaultProps = {
	record: {}
}

export default Single
