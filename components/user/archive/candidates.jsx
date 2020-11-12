import { Table, Avatar } from 'antd';
import xhr from '../../../xhr';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useStoreActions } from 'easy-peasy';

const ListCandidate = props => {
  const [candidates, setCandidates] = useState([]);
  const [total, setTotal] = useState(0);
  const [pager, updatePager] = useState({
    page: 1,
    limit: 10,
  });

  const onChange = async (page, limit) => {
    await get(page, limit);
    updatePager({ ...pager, page, limit });
  };

  const onRow = (record, index) => {
    return {
      onClick: _ => {},
    };
  };

  const get = (page, limit) =>
    xhr()
      .get(`/user?scope=${`candidate`}&page=${page}&offset=${limit}`)
      .then(res => {
        res.type = true;

        setCandidates(res.data);
        setTotal(res.data.total);
      })
      .catch(console.error);

  useEffect(() => {
    get(pager.page, pager.limit);
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
        pagination={{ pageSize: pager.limit, total: total, defaultCurrent: pager.page, onChange: onChange }}
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
