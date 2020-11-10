import PropTypes from 'prop-types'
import TotalPercent from "./TotalPercent";
import ModulePercent from './ModulePercent'
import {useEffect} from "react";

const Dashboard = ({show, config}) => {
	
	const components = {
		totalPercent: TotalPercent,
		modulePercent: ModulePercent
	}
	
	return (
		<div className="row no-gutters">
			{show.indexOf('TotalPercent') !== -1 && <div className="col"><components.totalPercent config={config.TotalPercent}/></div>}
			{show.indexOf('ModulePercent') !== -1 && <div className="col"><components.modulePercent/></div>}
		</div>
	)
}

Dashboard.propTypes = {
	show: PropTypes.array.isRequired,
	config: PropTypes.shape({
		TotalPercent: PropTypes.shape({
			legend: PropTypes.bool
		})
	})
}

Dashboard.defaultProps = {
	show: ['TotalPercent', 'ModulePercent'],
	config: {
		TotalPercent: {
			legend: true
		}
	}
}

export default Dashboard
