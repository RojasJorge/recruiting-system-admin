import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { delay } from 'lodash';
import xhr from '../../../xhr';
import { Table } from 'antd';

const ExpiredJobs = () => {
  const fill = useStoreActions(actions => actions.jobs.fill);
  const [loading, switchLoading] = useState(true);

  const getExpiredJob = async e => {
    await xhr()
      .get(`/job?page=1&offset=100&status=draft`)
      .then(res => {
        fill(res);
        console.log('expirednt....', res.data);
        delay(() => switchLoading(false), 1000, 'Filtered');
      })
      .catch(err => {
        console.log(err);
        delay(() => switchLoading(false), 1000, 'Filtered');
      });
  };

  useEffect(() => {
    getExpiredJob();
  }, []);

  // console.log('expired...', fill);

  const columns = [
    {
      title: 'Empresa',
      dataIndex: 'company',
      key: 'company',
      render: (text, record) => <>{record.company.name}</>,
    },
    {
      title: 'Plaza',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Fecha de expiración',
      dataIndex: 'expiration_date',
      key: 'expiration_date',
      render: (text, record) => (
        <>
          <Moment locale="es" format="D MMMM YYYY">
            {record.expiration_date}
          </Moment>
        </>
      ),
    },
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      fixed: 'right',
      width: 150,
      render: (text, record) => {
        return (
          <Link Link href={`/admin/jobs/single/[id]`} as={`/admin/jobs/single/${record.id}`}>
            <a style={buttonStyle}>
              <i className="material-icons">arrow_forward</i> Ver plaza
            </a>
          </Link>
        );
      },
    },
  ];
  return (
    <div className="umana-section">
      <h2>Plazas expiradas</h2>
      {/* <Table columns={columns} dataSource={separatedJobs.expired} rowKey={record => record.id} pagination={true} /> */}
    </div>
  );
};

export default ExpiredJobs;
