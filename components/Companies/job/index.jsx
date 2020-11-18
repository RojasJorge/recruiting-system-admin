import { Table, notification } from 'antd';
import { useState, useEffect } from 'react';
import Moment from 'react-moment';
import Link from 'next/link';
import moment from 'moment';
import xhr from '../../../xhr';
import { useRouter } from 'next/router';

const buttonStyle = {
  display: 'flex',
  alignItem: 'center',
  color: '#019688',
  textTransform: 'uppercase',
};

const CompanyJobs = props => {
  const router = useRouter();
  const [missing, isMissing] = useState(false);
  const [jobs, setJobs] = useState([]);
  const today = moment();

  const getCompanyJobs = () => {
    xhr()
      .get(`/job?company_id=${props.id}`)
      .then(res => {
        setJobs(res.data.items);
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

  const add = async e => {
    // console.log(e);
    delete e.id;
    delete e.company;
    delete e.created_at;
    delete e.expiration_date;
    delete e.updated_at;

    e.title = `${e.title} (copia)`;

    // console.log(e);
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
      responsive: ['md'],
      // render: (text, record) => (
      //   <>
      //     <p>{`Zona ${record.location.zone}, ${record.location.city}`}</p>
      //   </>
      // ),
    },
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
      title: 'Actions',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => {
        if (record.expiration_date > today.format()) {
          return (
            <Link href={`/admin/jobs/single/[id]`} as={`/admin/jobs/single/${record.id}`}>
              <a style={buttonStyle}>
                Ver plaza <i className="material-icons">navigate_next</i>
              </a>
            </Link>
          );
        } else {
          return (
            <a style={buttonStyle} onClick={() => add(record)}>
              duplicar <i className="material-icons">clone</i>
            </a>
          );
        }
      },
    },
  ];

  return (
    <>
      <div className="umana-title">
        <h2>{`Plazas de ${props.title}`}</h2>
      </div>
      <div className="" style={{ padding: 0 }}>
        {jobs ? <Table columns={columns} dataSource={jobs} rowKey={record => record.id} pagination={false} /> : 'Esta empresa no tiene plazas publicadas'}
      </div>
    </>
  );
};

export default CompanyJobs;
