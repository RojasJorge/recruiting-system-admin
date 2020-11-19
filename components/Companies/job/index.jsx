import { Table, notification, Spin } from 'antd';
import { useState, useEffect } from 'react';
import Moment from 'react-moment';
import Link from 'next/link';
import moment from 'moment';
import { delay, isEmpty } from 'lodash';
import xhr from '../../../xhr';
import { useRouter } from 'next/router';
import locale from '../../../data/translates/spanish';

const CompanyJobs = props => {
  const router = useRouter();
  const today = moment();
  const [loading, switchLoading] = useState(true);
  const [missing, isMissing] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [total, setTotal] = useState(0);
  const [pager, updatePager] = useState({
    page: 1,
    limit: 10,
  });

  const getCompanyJobs = (page, limit) => {
    xhr()
      .get(`/job?page=${page}&offset=${limit}&company_id=${props.id}`)
      .then(res => {
        setJobs(res.data.items);
        setTotal(res.data.total);
        delay(() => switchLoading(false), 1000, 'Filtered');
      })
      .catch(err => isMissing(true));
  };

  const allSet = e => {
    notification.info({
      message: `Confirmación`,
      description: 'La plaza ha sido publicada con éxito.',
      placement: 'bottomRight',
    });

    setTimeout(() => {
      router.push(`/admin/jobs/edit/[id]`, `/admin/jobs/edit/${e}`);
    }, 500);
  };

  const onChange = async (page, limit) => {
    await getCompanyJobs(page, limit);
    switchLoading(true);
    updatePager({ ...pager, page, limit });
  };

  const add = async e => {
    delete e.id;
    delete e.company;
    delete e.created_at;
    delete e.expiration_date;
    delete e.updated_at;

    e.title = `${e.title} (copia)`;

    xhr()
      .post(`/job`, JSON.stringify(e))
      .then(resp => {
        allSet(resp.data);
      })
      .catch(err => {
        notification.info({
          message: `Error`,
          description: 'Ha ocurrido un error, por favor inténtalo más tarde',
          placement: 'bottomRight',
        });
      });
  };

  useEffect(() => {
    getCompanyJobs(pager.page, pager.limit);
  }, []);

  const onRow = record => {
    return {
      onClick: _ => {
        router.push(`/admin/jobs/single/${record.id}`);
      },
    };
  };

  const columns = [
    {
      title: 'Plaza',
      dataIndex: 'title',
      key: 'title',
    },
    // {
    //   title: 'Ubicación',
    //   dataIndex: 'branch',
    //   key: 'branch',
    //   responsive: ['md'],
    //   render: (text, record) => (
    //     <>
    //       <p>{`Zona ${record.branch.zone}, ${record.branch.city}`}</p>
    //     </>
    //   ),
    // },
    {
      title: 'Fecha de expiración',
      dataIndex: 'expiration_date',
      key: 'expiration_date',
      responsive: ['md'],
      render: (text, record) => (
        <>
          <Moment locale="es" format="D MMMM YYYY">
            {record.expiration_date}
          </Moment>
        </>
      ),
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      responsive: ['md'],
      render: (text, record) => (
        <>
          <p>{locale(record.status)}</p>
        </>
      ),
    },
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      width: 50,
      render: (text, record) => <i className="material-icons">navigate_next</i>,
    },
  ];

  return (
    <>
      <div className="umana-title">
        <h2>{`Plazas de ${props.title}`}</h2>
      </div>
      <div className="umana-table-section" style={{ padding: 0 }}>
        {loading ? (
          <div className="umana-spinner">
            <Spin size="large" />
          </div>
        ) : null}
        {jobs ? (
          <Table
            onRow={onRow}
            columns={columns}
            dataSource={jobs.sort((a, b) => (b.created_at > a.created_at ? 1 : -1))}
            rowKey={record => record.id}
            pagination={false}
            pagination={{
              pageSize: pager.limit,
              total: total,
              defaultCurrent: pager.page,
              onChange: onChange,
              onShowSizeChange: onChange,
              showSizeChanger: true,
            }}
          />
        ) : (
          'Esta empresa no tiene plazas publicadas'
        )}
      </div>
    </>
  );
};

export default CompanyJobs;
