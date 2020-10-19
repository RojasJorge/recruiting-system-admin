import { Table } from 'antd';
import { useState, useEffect } from 'react';
import Moment from 'react-moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import xhr from '../../../xhr';

const buttonStyle = {
  display: 'flex',
  alignItem: 'center',
  color: '#019688',
  textTransform: 'uppercase',
};

const CompanyJobs = props => {
  const [missing, isMissing] = useState(false);
  const [jobs, setJobs] = useState([]);

  const getCompanyJobs = () => {
    xhr()
      .get(`/job?company_id=${props.id}`)
      .then(res => {
        setJobs(res.data.items);
      })
      .catch(err => isMissing(true));
  };

  useEffect(() => {
    getCompanyJobs();
  }, []);

  const columns = [
    {
      title: 'Plaza',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Ubicación',
      dataIndex: 'location',
      key: 'location',
      render: (text, record) => (
        <>
          <p>{`Zona ${record.location.zone}, ${record.location.city}`}</p>
        </>
      ),
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
      title: 'Actions',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => {
        return (
          <Link href={`/admin/jobs/single/[id]`} as={`/admin/jobs/single/${record.id}`}>
            <a style={buttonStyle}>
              Ver plaza <i className="material-icons">navigate_next</i>
            </a>
          </Link>
        );
      },
    },
  ];

  return (
    <>
      <div className="umana-title">
        <h2>{`Plazas de ${props.title}`}</h2>
      </div>
      <div className="" style={{ padding: 0 }}>
        {jobs ? (
          <Table
            columns={columns}
            dataSource={jobs}
            rowKey={record => record.id}
            pagination={false}
          />
        ) : (
          'Esta empresa no tiene plazas publicadas'
        )}
      </div>
    </>
  );
};

export default CompanyJobs;
