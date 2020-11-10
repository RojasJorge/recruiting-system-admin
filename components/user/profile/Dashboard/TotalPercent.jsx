import {Card, Progress} from 'antd';
import {useEffect, useState} from 'react';
import {useStoreState} from 'easy-peasy';
import {WarningOutlined} from '@ant-design/icons'
import {delay} from 'lodash';
import PropTypes from 'prop-types'

const TotalPercent = ({config: {legend, type}}) => {
	const [percent, updatePercent] = useState(0);
	
	const [loading, switchLoading] = useState(true);
	
	/** Get profile status */
	const profile = useStoreState(state => state.profile);
	
	const calculateMedia = _ => {
		const successItems = Object.values(profile).reduce((acc, current) => {
			if (current) {
				acc.push(current);
			}
			
			return acc;
		}, []);
		
		const totalItems = Object.keys(profile).length;
		
		const media = (100 / totalItems) * successItems.length;
		
		updatePercent(parseInt(media, 10));
		
		delay(_ => {
			switchLoading(false);
		}, 1000);
	};
	
	useEffect(() => {
		calculateMedia()
	}, [profile])
	
	return (
		<>
			<Card title="Mi perfil" style={{marginTop: 30}}>
				<Progress
					strokeLinecap="square"
					type={type}
					percent={percent}
				/>
				
				<Legends
					show={legend}
					loading={loading}
					percent={percent}
				/>
			</Card>
		</>
	);
};

const Legends = ({show, loading, percent}) => {
	
	if (show) return <div style={{marginTop: 15}}>
		{
			loading ? (
				<span>...</span>
			) : percent === 100 ? (
				<div>
					<p>Ahora puedes aplicar a las plazas disponbles dentro de Umana.</p>
				</div>
			) : <div>
				<p>
					<WarningOutlined/> Parece que aún no completas tu perfil.
				</p>
				<p>Para poder aplicar a las plazas que Umana te ofrece, debes completarlo.</p>
			</div>
		}
	</div>
	
	return (
		<>
		
		</>
	)
}

TotalPercent.propTypes = {
	config: PropTypes.shape({
		legend: PropTypes.bool,
		type: PropTypes.string
	})
}

TotalPercent.defaultProps = () => {
	return {
		config: {
			legend: true,
			type: 'line'
		}
	}
}

export default TotalPercent;
