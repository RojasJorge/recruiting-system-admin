import xhr from '../../xhr';
import { useEffect, useState } from 'react';
import { Pagination, Select, Table } from 'antd';
import RequestStatus from './RequestStatus';
import EmptyElemet from '../../elements/Empty';
import { isEmpty } from 'lodash';
import candidateImg from '../../images/welcome-talento.png';
import { useRouter } from 'next/router';

const { Option } = Select;

const dataEmpty = {
  title: 'Aún no has aplicado a ninguna plaza',
  content: `Busca oportunidades en la sección de plazas disponibles`,

  buttonTitle: 'Buscar oportunidades',
  url: '/admin/jobs',
  img: candidateImg,
};

const CandidateRequests = _ => {
  const router = useRouter();

  const [requests, setRequests] = useState({
    list: [],
    total: 0,
  });

  const [filters, setFilters] = useState({
    page: 1,
    offset: 10,
    jobId: null,
  });

  /** Handle pagination */
  const onChange = (page, offset) => setFilters({ ...filters, page, offset });

  /** Select row events */
  const onRow = record => {
    return {
      onClick: _ => {
        router.push(`/admin/requests/${record.apply.id}`);
      },
    };
  };

  const getCandidateRequests = _ => {
    let query = `?page=${filters.page}&offset=${filters.offset}`;

    if (filters.jobId) query += `&jobId=${filters.jobId}`;

    xhr()
      .get(`/apply/candidate${query}`)
      .then(resp =>
        setRequests({
          ...requests,
          list: resp.data.items,
          total: resp.data.total,
        }),
      )
      .catch(err => console.log('Error: ', err));
  };

  useEffect(() => {
    getCandidateRequests();
  }, [filters.page, filters.offset, requests.total]);

  if (!isEmpty(requests.list)) {
    return (
      <>
        {/*TABLE CONTENTS*/}
        <div style={{ width: '100%', marginBottom: 30 }}>
          <Table
            columns={[
              {
                title: 'Empresa',
                dataIndex: 'company',
                key: 'company',
                render: text => (
                  <div>
                    <div>{text.name}</div>
                    <small>
                      {text.location.city}, {text.location.province} - {text.location.country}
                    </small>
                  </div>
                ),
              },
              {
                title: 'Plaza',
                dataIndex: 'job',
                key: 'job',
                render: text => <div>{text.title}</div>,
              },
              {
                title: 'Estado',
                dataIndex: 'apply',
                key: 'apply',
                render: (text, record) => (
                  <div>
                    <RequestStatus record={record} />
                  </div>
                ),
              },
            ]}
            dataSource={requests.list}
            rowKey={record => record.apply.id}
            onRow={onRow}
            pagination={false}
            size="large"
            bordered
          />
        </div>

        {/*PAGINATION*/}
        <Pagination total={requests.total} current={filters.page} onChange={onChange} disabled={filters.offset > requests.total} />
      </>
    );
  } else {
    return (
      <>
        <EmptyElemet data={dataEmpty} />
      </>
    );
  }
};

export default CandidateRequests;
