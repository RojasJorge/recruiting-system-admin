import { useEffect, useState } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { Table, Pagination } from 'antd'
import xhr from '../../xhr'

const UsersList = () => {
  const users = useStoreState(state => state.users)
  const fill = useStoreActions(actions => actions.users.fill)

  const [pager, updatePager] = useState({
    page: 1,
    limit: 10
  })

  const onChange = async (page, limit) => {
    updatePager({ page, limit })
    await get({ page, limit })
  }

  const get = async p => xhr()
    .get(`/user?pager=${JSON.stringify(p ? p : pager)}`)
    .then(res => {
      res.type = true /** This param (if true) loads a collection, false => single object */
      fill(res)
    })
    .catch(console.error)

  useEffect(() => {
    get()
  }, [])

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Users list</h1>
      </div>
      <div className="col-md-12" style={{ marginBottom: 20 }}>
        <Pagination
          total={users.total}
          onChange={onChange}
          onShowSizeChange={onChange}
          showSizeChanger
          pageSizeOptions={["10", "20", "40", "60", "100"]}
          hideOnSinglePage
        />
      </div>
      <div className="col-md-12">
        <Table
          bordered
          size="middle"
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
