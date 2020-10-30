import {Table} from 'antd'
import PropTypes from 'prop-types'
import {useStoreState} from "easy-peasy";
import {MailOutlined} from '@ant-design/icons'
import {find} from 'lodash'

const MatchTable = ({data}) => {
	
	const collections = useStoreState(state => state.collections)
	
	const currentJobTitle = cuid =>
		find(collections.career, o => o.id === cuid).name
	
	const onRow = (record, index) => {
		return {
			onClick: () => {
				console.log('Record:', record)
			}
		}
	}
	
	return (
		<div style={{marginTop: 30}}>
			<h2>Coinsidencias</h2>
			<Table
				dataSource={data}
				rowKey={record => record.id}
				pagination={false}
				onRow={onRow}
				bordered
				columns={[{
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
						{/*{record.profile.fields.personal.currentJobTitle}*/}
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
						<MailOutlined style={{fontSize: 20}} />
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
