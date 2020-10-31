import {useEffect, useState} from 'react'
import Layout from '../../views/Layout'
import {PageTitle} from '../../elements'
import {Card, Progress} from 'antd'
import Link from 'next/link'
import {useStoreActions, useStoreState} from "easy-peasy"
// import {groupBy} from 'lodash'

const Admin = _ => {
	
	const [percent, updatePercent] = useState(0)
	
	/** Get profile status */
	const profile = useStoreState(state => state.profile)
	
	/** Check profile status */
	const checkProfileStatus = useStoreActions(actions => actions.profile.verify)
	
	/** Get user from store */
	const auth = useStoreState(state => state.auth.user)
	
	const calculateMedia = _ => {
		
		const successItems = Object.values(profile).reduce((acc, current) => {
			if(current) {
				acc.push(current)
			}
			
			return acc
		}, [])
		
		const totalItems = Object.keys(profile).length
		
		const media = (100 / totalItems) * successItems.length
		
		updatePercent(parseInt(media))
	}
	
	useEffect(() => {
		calculateMedia()
	}, [profile])
	
	useEffect(() => {
		{auth.user && checkProfileStatus(user.profile.fields)}
	}, [])
	
	return (
		<Layout title="Tablero" className="dashboard" containerClass="dashboard-page">
			<>
				<PageTitle title="Tablero"/>
				
				{/*<div className="row">*/}
				{/*	<div className="col">*/}
				{/*		<pre>{JSON.stringify(profile, false, 2)}</pre>*/}
				{/*	</div>*/}
				{/*</div>*/}
				
				<div className="row">
					<div className="col-md-6">
						
						<Card
							title="Perfil"
						>
							<div className="row align-items-center justify-content-center">
								<div className="col">
									
									<Progress
										strokeLinecap="square"
										type="circle"
										percent={percent}
									/>
								
								</div>
								<div className="col">
									<p>Parece que aún no completas tu perfil.</p>
									<p>Para poder aplicar a las plazas que Umana te ofrece, debes completarlo.</p>
									<Link
										passHref
										href={{
											pathname: '/admin/profile'
										}}
									>
										<a>Ir a completar mi perfil.</a>
									</Link>
								</div>
							</div>
						</Card>
					
					</div>
				</div>
			</>
		</Layout>
	)
}

export default Admin
