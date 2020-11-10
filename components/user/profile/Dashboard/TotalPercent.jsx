import {Card, Progress} from 'antd';
import {useEffect, useState} from 'react';
import {useStoreActions, useStoreState} from 'easy-peasy';
import {WarningOutlined} from '@ant-design/icons'
import {delay} from 'lodash';

const TotalPercent = ({config: {legend}}) => {
	const [percent, updatePercent] = useState(0);
	
	const [loading, switchLoading] = useState(true);
	
	/** Get profile status */
	const profile = useStoreState(state => state.profile);
	
	/** Check profile status */
	const checkProfileStatus = useStoreActions(actions => actions.profile.verify);
	
	/** Get user from store */
	const auth = useStoreState(state => state.auth.user);
	
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
		calculateMedia();
	}, [profile]);
	
	useEffect(() => {
		{
			auth.user && checkProfileStatus(user.profile.fields)
		}
	}, [])
	
	return (
		<>
			<Card title="Mi perfil" style={{marginTop: 30}}>
				<Progress
					strokeLinecap="square"
					type="circle"
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

export default TotalPercent;
