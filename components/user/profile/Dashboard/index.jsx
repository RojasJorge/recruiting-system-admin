import PropTypes from 'prop-types'
import TotalPercent from "./TotalPercent";
import ModulePercent from './ModulePercent'
import {useEffect} from "react";

const Dashboard = ({show}) => {
	
	const components = {
		totalPercent: TotalPercent,
		modulePercent: ModulePercent
	}
	
	useEffect(() => {
		console.log('Show:', show)
	}, [])
	
	return (
		<div className="row">
			{show.indexOf('TotalPercent') !== -1 && <components.totalPercent/>}
			{show.indexOf('ModulePercent') !== -1 && <components.modulePercent/>}
		</div>
	)
}

Dashboard.propTypes = {
	show: PropTypes.array.isRequired,
}

Dashboard.defaultProps = {
	show: ['TotalPercent', 'ModulePercent']
}

export default Dashboard
