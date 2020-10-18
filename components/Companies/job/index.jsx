import { Table } from 'antd';
import { useStoreState } from 'easy-peasy';
import Moment from 'react-moment';
import Link from 'next/link';
import { useRouter } from 'next/router';

const buttonStyle = {
  display: 'flex',
  alignItem: 'center',
  color: '#019688',
  textTransform: 'uppercase',
};

const CompanyJobs = props => {
  const router = useRouter();
  const data = useStoreState(state => state.jobs);
  const own = data && data.list ? data.list.filter(o => o.company_id === props.id) : [];

  const columns = [
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
        {data && data.list ? (
          <Table
            columns={columns}
            dataSource={own}
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
