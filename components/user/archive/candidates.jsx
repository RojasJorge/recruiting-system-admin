import { Table, Avatar } from 'antd';
import xhr from '../../../xhr';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useStoreActions } from 'easy-peasy';

const ListCandidate = props => {
  const [candidates, setCandidates] = useState([]);
  const [total, setTotal] = useState(0);

  const onRow = (record, index) => {
    return {
      onClick: _ => {},
    };
  };

  const get = () =>
    xhr()
      .get(`/user?scope=${`candidate`}&page=1&offset=10`)
      .then(res => {
        res.type = true;

        setCandidates(res.data);
        setTotal(res.data.total);
      })
      .catch(console.error);

  useEffect(() => {
    get();
  }, []);

  return (
    <div>
      <h2>Perfiles de candidatos</h2>
      <Table
        bordered
        size="small"
        dataSource={candidates.items}
        rowKey={record => record.id}
        // pagination={true}
        onRow={onRow}
        pagination={{ pageSize: 10, total: total, defaultCurrent: 1 }}
        columns={[
          {
            title: '',
            dataIndex: 'avatar',
            key: 'avatar',
            width: 40,
            render: (text, record) => <Avatar className="table-avatar" icon={<i className="material-icons">person</i>} src={record.avatar} size={30} />,
          },
          {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
              <Link href={`/admin/profile/[id]`} as={`/admin/profile/${record.id}`}>
                <a>{record.name}</a>
              </Link>
            ),
          },
          {
            title: 'Apellido',
            dataIndex: 'lastname',
            key: 'lastname',
          },
          {
            title: 'Dirección',
            dataIndex: 'address',
            key: 'address',
          },
          {
            title: 'Correo electrónico',
            dataIndex: 'email',
            key: 'email',
          },
          {
            title: 'Teléfono',
            dataIndex: 'phone',
            key: 'phone',
          },
          {
            title: 'Estado',
            dataIndex: 'status',
            key: 'status',
            render: s => (s ? 'Activo' : 'Inactivo'),
          },
        ]}
      />
    </div>
  );
};
export default ListCandidate;
