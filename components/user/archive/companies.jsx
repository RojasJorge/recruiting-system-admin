import { Table, Avatar } from 'antd';
import xhr from '../../../xhr';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useStoreActions } from 'easy-peasy';

const ListCompanies = props => {
  const [companies, setcompanies] = useState([]);
  const [total, setTotal] = useState(0);
  const [pager, updatePager] = useState({
    page: 1,
    limit: 10,
  });

  const onRow = (record, index) => {
    return {
      onClick: _ => {},
    };
  };
  const onChange = async (page, limit) => {
    await get(page, limit);
    updatePager({ ...pager, page, limit });
  };

  const get = (page, limit) =>
    xhr()
      .get(`/user?scope=${`company`}&page=${page}&offset=${limit}`)
      .then(res => {
        res.type = true;

        setcompanies(res.data);
        setTotal(res.data.total);
      })
      .catch(console.error);

  useEffect(() => {
    get(pager.page, pager.limit);
  }, []);

  return (
    <div>
      <h2>Perfiles de empresas</h2>
      <Table
        bordered
        size="small"
        dataSource={companies.items}
        rowKey={record => record.id}
        pagination={{ pageSize: 10, total: total, defaultCurrent: 1, onChange: onChange }}
        columns={[
          {
            title: '',
            dataIndex: 'avatar',
            key: 'avatar',
            width: 40,
            render: (text, record) => <Avatar className="table-avatar" icon={<i className="material-icons">business</i>} size={30} />,
          },
          {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => `${record.name} ${record.lastname}`,
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
            title: '',
            dataIndex: 'status',
            key: 'status',
            width: 50,
            render: s => <i className="material-icons">chevron_right</i>,
          },
        ]}
      />
    </div>
  );
};
export default ListCompanies;
