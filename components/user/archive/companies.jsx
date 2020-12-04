import { Avatar, Table } from 'antd';
import { isEmpty } from 'lodash';
import xhr from '../../../xhr';
import { useEffect, useState } from 'react';

const ListCompanies = props => {
  const [loading, switchLoader] = useState(true);
  const [companies, setcompanies] = useState([]);
  const [total, setTotal] = useState(0);
  const [pager, updatePager] = useState({
    page: 1,
    limit: 50,
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
        switchLoader(false);
      })
      .catch(err => {
        console.log(err);
        switchLoader(false);
      });

  useEffect(() => {
    get(pager.page, pager.limit);
  }, []);

  return (
    <div>
      <h2>Perfiles de empresas</h2>
      <div className="umana-table-section">
        <Table
          bordered
          loading={loading}
          size="small"
          dataSource={!isEmpty(companies.items) ? companies.items.sort((a, b) => (b.created_at > a.created_at ? 1 : -1)) : []}
          rowKey={record => record.id}
          pagination={{
            pageSize: 10,
            total: total,
            defaultCurrent: pager.page,
            onChange: onChange,
            onShowSizeChange: onChange,
            showSizeChanger: true,
          }}
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
    </div>
  );
};
export default ListCompanies;
