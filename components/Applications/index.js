import PropTypes from 'prop-types'
import {Avatar, Table} from 'antd'
import {RightOutlined, UserOutlined} from '@ant-design/icons'
import moment from 'moment'
import RequestStatus from "./RequestStatus";
import {useRouter} from "next/router";
import {useStoreActions} from "easy-peasy";

const Applications = ({applications, total, filters}) => {
	
	const router = useRouter()
	
	const match = useStoreActions(actions => actions.jobs.match)
	
	/** Select row events */
	const onRow = (record) => {
		return {
			onClick: _ => {
				router.push({
					pathname: `/admin/requests/${record.apply.id}`,
					query: {
						c: record.company.id,
						j: record.job.id
					}
				})
			}
		}
	}
	
	return (
		<>
			<Table
				columns={[{
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
					render: (text, record) => `${match({
						job: record.job,
						company: record.company,
						profile: record.candidate.profile
					}).percent}%`
				}, {
					title: 'Estado',
					dataIndex: 'company',
					key: 'company',
					render: (text, record) => <RequestStatus record={record}/>
				}, {
					title: '',
					dataIndex: '',
					key: '',
					render: _ => <RightOutlined/>
				}]}
				dataSource={applications}
				rowKey={record => record.apply.id}
				onRow={onRow}
				pagination={{
					simple: true,
					total: applications.length
				}}
				size="small"
				bordered
			/>
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
