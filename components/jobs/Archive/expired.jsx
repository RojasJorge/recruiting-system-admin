import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { delay, isEmpty } from 'lodash';
import xhr from '../../../xhr';
import { Table, Spin, Alert } from 'antd';

import Moment from 'react-moment';
import { useRouter } from 'next/router';
import { SkeletonList } from '../../../elements';

const ExpiredJobs = ({ title, type, filters }) => {
  const router = useRouter();
  const [loading, switchLoading] = useState(true);
  const [emptyResult, setEmptyResult] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [total, setTotal] = useState(0);
  const [pager, updatePager] = useState({
    page: 1,
    limit: 10,
  });

  const getJobs = async (page, limit) => {
    switchLoading(true);

    let url = `/job?page=${page}&offset=${limit}&status=${type}`;

    if (filters.jobposition) {
      url += `&jobposition=${filters.jobposition}`;
    }

    if (filters.title) {
      url += `&title=${filters.title}`;
    }

    if (!isEmpty(filters.country)) {
      url += `&province=${filters.country.department}`;
    }

    if (filters.city) {
      url += `&city=${filters.city}`;
    }
    await xhr()
      .get(url)
      .then(res => {
        if (isEmpty(res.data.items)) {
          setEmptyResult(true);
          setJobs([]);
          delay(() => switchLoading(false), 1000, 'Filtered');
          return false;
        }
        setEmptyResult(false);
        setJobs(res.data);
        setTotal(res.data.total);
        delay(() => switchLoading(false), 1000, 'Filtered');
      })
      .catch(err => {
        console.log(err);
        delay(() => switchLoading(false), 1000, 'Filtered');
        setJobs([]);
      });
  };

  useEffect(() => {
    getJobs(pager.page, pager.limit);
  }, [type, filters.title]);

  const onChange = async (page, limit) => {
    await getJobs(page, limit);
    switchLoading(true);
    updatePager({ ...pager, page, limit });
  };

  const columns = [
    {
      title: 'Plaza',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Empresa',
      dataIndex: 'company',
      key: 'company',
      width: 200,
      render: (text, record) => <>{record.company.name}</>,
    },
    {
      title: 'Fecha de expiración',
      dataIndex: 'expiration_date',
      key: 'expiration_date',
      width: 200,
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
      width: 50,
      render: (text, record) => {
        return <i className="material-icons">chevron_right</i>;
      },
    },
  ];

  // console.log('hssssss....', loading);
  const onRow = record => {
    return {
      onClick: _ => {
        router.push(`/admin/jobs/single/${record.id}`);
      },
    };
  };

  return (
    <div className="umana-section">
      {emptyResult && filters && filters.title ? <Alert style={{ marginBottom: 20 }} message={`No hay resultados de la busqueda.`} type="error" /> : null}

      <h2>{title}</h2>
      <div className="umana-table-section">
        {loading ? (
          <SkeletonList />
        ) : (
          <Table
            columns={columns}
            bordered
            size="small"
            dataSource={jobs.items ? jobs.items.sort((a, b) => (b.created_at > a.created_at ? 1 : -1)) : null}
            rowKey={record => record.id}
            onRow={onRow}
            pagination={{ pageSize: pager.limit, total: total, defaultCurrent: pager.page, onChange: onChange }}
          />
        )}
      </div>
    </div>
  );
};

export default ExpiredJobs;
