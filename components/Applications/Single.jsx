import PropTypes from 'prop-types';
// import {FileSearchOutlined} from '@ant-design/icons'
import {Alert, Input, Modal, notification, Select, Skeleton} from 'antd'
import {Sitebar} from '../../elements';
import Moment from 'react-moment';
import SingleProfile from '../user/single';
import Link from 'next/link';
import {find} from 'lodash'
import {AbilityContext} from "../Can";
import {useContext, useEffect, useState} from "react";
import xhr from "../../xhr";
import {useRouter} from 'next/router'

const {Option} = Select

const STATUS = [{
	name: 'Pendiente',
	id: 'PENDING'
}, {
	name: 'Recibido',
	id: 'RECEIVED'
}, {
	name: 'En revisión',
	id: 'IN_REVIEW'
}, {
	name: 'Cancelado',
	id: 'CANCELLED'
}, {
	name: 'Finalizado',
	id: 'SUCCESS'
}]

const Single = ({query}) => {
	
	const router = useRouter()
	
	const ability = useContext(AbilityContext)
	
	const [status, setStatus] = useState('PENDING')
	
	/** Local state */
	const [record, updateRecord] = useState(null)
	
	const getRecord = async _ =>
		await xhr()
			.get(`/apply/${query.id}`)
			.then(resp => updateRecord(resp.data.items ? resp.data.items[0] : {}))
			.catch(err => console.log(err))
	
	useEffect(() => {
		getRecord()
	}, [query.id])
	
	const onStatusSelect = e =>
		Modal.confirm({
			title: '¿Confirma actualizar la solicitud?',
			okText: 'Si, Actualizar',
			cancelText: 'Cancelar',
			content: <Alert message="Esta operación enviará correos electrónicos a los involucrados" type="error"/>,
			onOk: () => {
				xhr()
					.put(`/apply/${record.apply.id}`, JSON.stringify({
						status: e,
						company: record.company.name,
						job: record.job.title,
						email: record.candidate.email,
						name: record.candidate.name
					}))
					.then(resp => {
						showNotification('success', 'Exitoso', `El estado de la solicitud ha sido actualizado exitosamente a ${find(STATUS, o => o.id === e).name}`)
						setStatus(e)
					})
					.catch(err => {
						showNotification('error', 'Error', 'No se ha podido actualizar la solicitud actual, por favor intente de nuevo.')
						console.log(err)
					})
			}
		})
	
	const showNotification = (type, message, description) => {
		notification[type]({
			message,
			description
		});
	};
	
	return (
		<div className="umana-layout-cl">
			<div className="umana-layout-cl__small ">
				<Sitebar theme="orange">
					<Link
						href={{
							pathname: '/admin/requests',
							query: {
								c: router.query.c,
								j: router.query.j
							}
						}}
					>
						<a>
							<i
								className="material-icons"
								style={{fontSize: 28, color: 'rgba(52, 52, 52, 0.5)'}}
							>
								arrow_back
							</i>
						</a>
					</Link>
					<h2>{record && record.company.name}</h2>
					<p>{record && record.job.title}</p>
					<p className="date">
						<i className="material-icons">access_time</i>
						<span style={{marginRight: 5}}>Expira</span>{' '}
						<Moment locale="es" format="D MMMM YYYY">
							{record && record.job.expiration_date}
						</Moment>
					</p>
					
					{
						ability.can('edit', 'UPDATE_SINGLE_REQUEST')
							? <>
								<h3 style={{
									marginTop: 50
								}}>Actualizar estado:</h3>
								<Select
									value={status}
									disabled={!ability.can('edit', 'UPDATE_SINGLE_REQUEST')}
									onSelect={onStatusSelect}
								>
									{
										STATUS.map(status => (
											<Option key={status.id} value={status.id}>
												{status.name}
											</Option>
										))
									}
								</Select>
							</>
							: <div style={{marginTop: 30}}>
								<h3>Estado actual:</h3>
								{
									record
										? <Input
											value={find(STATUS, o => o.id === record.apply.status).name}
											size="large"
										/>
										: '...'
								}
							</div>
					}
				</Sitebar>
			</div>
			<div className="umana-layout-cl__flex width-section bg-white">
				{!record ? <Skeleton/> : <SingleProfile data={record.candidate}/>}
			</div>
		</div>
	);
};

Single.propTypes = {
	record: PropTypes.object,
};

Single.defaultProps = {
	record: {},
};

export default Single;
