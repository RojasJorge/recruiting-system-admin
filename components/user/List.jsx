import { useEffect, useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Table, Pagination } from "antd";

const UsersList = () => {
  const users = useStoreState(state => state.users);
  const get = useStoreActions(actions => actions.users.get);

  const columns = [
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
  ];

  useEffect(() => {
    get();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Users list</h1>
      </div>
      <div className="col-md-12">
        <Table
          dataSource={users.list}
          columns={columns}
          rowKey={record => record.id}
          pagination={false}
          bordered
        />
      </div>
      <div className="col-md-12" style={{ marginTop: 20 }}>
        <Pagination total={users.total} />
      </div>
    </div>
  );
};

export default UsersList;
