import { Table, Avatar } from 'antd';
import xhr from '../../../xhr';
import { useEffect, useState } from 'react';
// import Link from 'next/link';

import { useRouter } from 'next/router';

const ListCandidate = props => {
  const router = useRouter();
  const [loading, switchLoader] = useState(true)
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

  const onRow = record => {
    return {
      onClick: _ => {
        router.push(`/admin/profile/${record.id}`);
      },
    };
  };

  const get = (page, limit) =>
    xhr()
      .get(`/user?scope=${`candidate`}&page=${page}&offset=${limit}`)
      .then(res => {
        res.type = true;

        setCandidates(res.data);
        setTotal(res.data.total);
        switchLoader(false)
      })
      .catch(err => {
        switchLoader(false)
        console.log(err)
      });

  useEffect(() => {
    get(pager.page, pager.limit);
  }, []);

  return (
    <div>
      <h2>Perfiles de candidatos</h2>
      <Table
        bordered
        loading={loading}
        size="small"
        dataSource={candidates.items}
        rowKey={record => record.id}
        onRow={onRow}
        pagination={{
          pageSize: pager.limit,
          total: total,
          defaultCurrent: pager.page,
          onChange: onChange,
          onShowSizeChange: onChange,
          showSizeChanger: true
        }}
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
export default ListCandidate;
