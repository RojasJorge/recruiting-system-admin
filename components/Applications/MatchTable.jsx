import {Table} from 'antd'
import PropTypes from 'prop-types'
import {useStoreActions, useStoreState} from "easy-peasy";
import {RightOutlined} from '@ant-design/icons'
import {find} from 'lodash'
import {useRouter} from "next/router";
import GetContactNotifications from "./GetContactNotifications";

const MatchTable = ({data}) => {
	
	const router = useRouter()
	
	const collections = useStoreState(state => state.collections)
	const match = useStoreActions(actions => actions.jobs.match)
	
	const currentJobTitle = cuid =>
		find(collections.career, o => o.id === cuid).name
	
	const onRow = (record, index) => {
		return {
			onClick: () => {
				router.push(`/admin/profile/${record.profile.uid}?companyId=${record.company.id}&jobId=${record.job.id}&profileId=${record.profile.id}`)
			}
		}
	}
	
	return (
		<div style={{marginTop: 30}}>
			<h2>Posibles candidatos</h2>
			<Table
				dataSource={data}
				rowKey={record => record.profile.id}
				pagination={false}
				onRow={onRow}
				bordered
				columns={[{
					title: 'Contacto',
					dataIndex: 'company',
					key: 'company',
					render: (text, record) => <GetContactNotifications record={record} />
				}, {
					title: 'Nombre',
					dataIndex: 'profile.fields.personal',
					key: 'profile.fields.personal',
					render: (text, record) => <div>
						{record.profile.fields.personal.name} {record.profile.fields.personal.lastname}
					</div>
				}, {
					title: 'Área',
					dataIndex: 'profile.fields.personal',
					key: 'profile.fields.personal',
					render: (text, record) => <div>
						{currentJobTitle(record.profile.fields.personal.currentJobTitle)}
					</div>
				}, {
					title: 'Ubicación',
					dataIndex: 'profile.fields.personal',
					key: 'profile.fields.personal',
					render: (text, record) => <div>
						{record.profile.fields.personal.location.city}, {record.profile.fields.personal.location.country}
					</div>
				}, {
					title: 'Match',
					dataIndex: 'job',
					key: 'job',
					render: (text, record) => `${match(record).percent}%`
				}, {
					title: 'Email',
					dataIndex: 'profile.fields.personal',
					key: 'profile.fields.personal',
					render: (text, record) => <div>
						{record.profile.fields.personal.email}
					</div>
				}, {
					title: '',
					dataIndex: 'profile.fields.personal',
					key: 'profile.fields.personal',
					render: (text, record) => <div>
						<RightOutlined style={{fontSize: 20}}/>
					</div>
				}]}
			/>
		</div>
	)
}

MatchTable.propTypes = {
	data: PropTypes.array.isRequired
}

MatchTable.defaultProps = {
	data: []
}

export default MatchTable
