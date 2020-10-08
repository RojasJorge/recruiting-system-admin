import PropTypes from 'prop-types'
import {Avatar, Pagination, Table} from 'antd'
import {RightOutlined, UserOutlined} from '@ant-design/icons'
import moment from 'moment'
import Link from 'next/link'

const RenderLink = ({record}) => {
	
	const translateStatus = status => {
		
		let params = {
			string: 'default',
			color: '#019688'
		}
		
		switch (status) {
			case 'PENDING':
				params = {...params, string: 'PENDIENTE'}
				break
			case 'APPLICATION_SENT':
				params = {...params, string: 'APPLICACIÓN ENVIADA'}
				break
			default:
				params = params
				break
		}
		
		return params
	}
	
	return (
		<>
			<Link href={`/admin/applications/${record.apply.id}`} passHref>
				<a>
					<span style={{
						color: translateStatus(record.apply.status).color
					}}>
						{translateStatus(record.apply.status).string}
					</span>
				</a>
			</Link>
		</>
	)
}

const columns = [{
	title: '',
	dataIndex: '',
	key: '',
	render: _ => <Avatar icon={<UserOutlined/>}/>
}, {
	title: 'Nombre',
	dataIndex: 'candidate',
	key: 'dandidate',
	render: (text, record) => <>
		{`${record.candidate.name} ${record.candidate.lastname}`}
	</>
}, {
	title: 'Puesto al que aplica',
	dataIndex: 'job',
	key: 'job',
	render: (text, record) => <>
		<div>{record.job.title}</div>
		<small>{record.company.name}, {record.company.location.city}</small>
	</>
}, {
	title: 'Expira',
	dataIndex: 'job',
	key: 'job',
	render: (text, record) => <>
		{moment(record.job.expiration_date).format('DD/MM/YYYY')}
	</>
}, {
	title: 'Match',
	dataIndex: 'apply',
	key: 'apply',
	render: (text, record) => <>
		100%
	</>
}, {
	title: 'Estado',
	dataIndex: 'company',
	key: 'company',
	render: (text, record) => <RenderLink record={record}/>
}, {
	title: '',
	dataIndex: '',
	key: '',
	render: _ => <RightOutlined/>
}]

const Applications = ({applications, total, filters}) => {
	
	return (
		<>
			<Table
				dataSource={applications}
				columns={columns}
				rowKey={record => record.apply.id}
				pagination={false}
				size="small"
				bordered
			/>
			
			<div style={{marginTop: 30}}>
				<Pagination total={total}/>
			</div>
		</>
	)
}

Applications.propTypes = {
	applications: PropTypes.array,
	total: PropTypes.number
}

Applications.defaultProps = {
	applications: [],
	total: 0
}

export default Applications
