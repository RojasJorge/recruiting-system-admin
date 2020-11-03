import {Card, Progress} from "antd";
import {WarningOutlined} from "@ant-design/icons";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useStoreActions, useStoreState} from "easy-peasy";
import {delay} from "lodash";


const TotalPercent = () => {
	
	const [percent, updatePercent] = useState(0)
	
	const [loading, switchLoading] = useState(true)
	
	/** Get profile status */
	const profile = useStoreState(state => state.profile)
	
	/** Check profile status */
	const checkProfileStatus = useStoreActions(actions => actions.profile.verify)
	
	/** Get user from store */
	const auth = useStoreState(state => state.auth.user)
	
	const calculateMedia = _ => {
		
		const successItems = Object.values(profile).reduce((acc, current) => {
			if (current) {
				acc.push(current)
			}
			
			return acc
		}, [])
		
		const totalItems = Object.keys(profile).length
		
		const media = (100 / totalItems) * successItems.length
		
		updatePercent(parseInt(media, 10))
		
		delay(_ => {
			switchLoading(false)
		}, 1000)
	}
	
	useEffect(() => {
		calculateMedia()
	}, [profile])
	
	useEffect(() => {
		{
			auth.user && checkProfileStatus(user.profile.fields)
		}
	}, [])
	
	return (
		<>
			<div className="col-md-6">
				
				<Card
					title="Mi perfil"
					style={{marginTop: 30}}
				>
					<div className="row justify-content-center">
						<div className="col">
							<Progress
								strokeLinecap="square"
								type="circle"
								percent={percent}
							/>
						
						</div>
						{
							loading ? <div className="col">
									...
								</div>
								: percent === 100
								? <div className="col">
									<p>Ahora puedes aplicar a las plazas disponbles dentro de Umana.</p>
								</div>
								: <div className="col">
									<p><WarningOutlined/> Parece que aún no completas tu perfil.</p>
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
						}
					
					</div>
				</Card>
			
			</div>
		</>
	)
}

export default TotalPercent
