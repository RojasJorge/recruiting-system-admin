import {useEffect, useState} from 'react'
import {useStoreState, useStoreActions} from 'easy-peasy'
import {Table, Pagination} from 'antd'
import xhr from '../../xhr'

const UsersList = () => {
	const users = useStoreState(state => state.users)
	const fill = useStoreActions(actions => actions.users.fill)
	
	const [pager, updatePager] = useState({
		page: 1,
		limit: 10
	})
	
	const onChange = async (page, limit) => {
		await get(page, limit)
		updatePager({...pager, page, limit})
	}
	
	const get = async (page, limit) => xhr()
		.get(`/user?page=${page}&offset=${limit}`)
		.then(res => {
			res.type = true
			/** This param (if true) loads a collection, false => single object */
			fill(res)
		})
		.catch(console.error)
	
	useEffect(() => {
		get(pager.page, pager.limit)
	}, [])
	
	return (
		<div className="row">
			<div className="col-md-12">
				{/*<pre>{JSON.stringify(users, false, 2)}</pre>*/}
			</div>
			<div className="col-md-12">
				<h1>Users list</h1>
			</div>
			{/*<div>*/}
			{/*  <pre>{JSON.stringify(users, false, 2)}</pre>*/}
			{/*</div>*/}
			<div className="col-md-12" style={{marginBottom: 20}}>
				<Pagination
					total={users.total}
					current={pager.page}
					onChange={onChange}
					onShowSizeChange={onChange}
					showSizeChanger
					pageSizeOptions={["10", "20", "40", "60", "100"]}
				/>
			</div>
			<div className="col-md-12">
				<Table
					bordered
					size="small"
					dataSource={users.list}
					rowKey={record => record.id}
					pagination={false}
					columns={[
						{
							title: "Nombre",
							dataIndex: "name",
							key: "name"
						},
						{
							title: "Apellido",
							dataIndex: "lastname",
							key: "lastname"
						},
						{
							title: "Dirección",
							dataIndex: "address",
							key: "address"
						},
						{
							title: "Email",
							dataIndex: "email",
							key: "email"
						},
						{
							title: "Teléfono",
							dataIndex: "phone",
							key: "phone"
						},
						{
							title: "Estado",
							dataIndex: "status",
							key: "status",
							render: s => (s ? "Activo" : "Inactivo")
						}
					]}
				/>
			</div>
		</div>
	)
}

export default UsersList
