import { useState, useEffect } from 'react';
import { Pagination, Spin, Alert } from 'antd';
import { delay, isEmpty } from 'lodash';
import { Card, EmptyElemet } from '../../../elements';
import { useRouter } from 'next/router';
import xhr from '../../../xhr';
import { useStoreState } from 'easy-peasy';
import Label from '../../../data/labels';
import { filter } from 'domutils';

const PublicJobs = ({ filters, empty }) => {
  const router = useRouter();
  const [loading, switchLoading] = useState(true);
  const [emptyResult, setEmptyResult] = useState(false);
  const [jobs, setJobs] = useState([]);
  const auth = useStoreState(state => state.auth);
  const [total, setTotal] = useState(0);
  const [pager, updatePager] = useState({
    page: 1,
    limit: 8,
  });

  const getJobs = async (page, limit) => {
    switchLoading(true);

    let url = `/job?page=${page}&offset=${limit}&status=public`;

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
        setJobs(res.data.items);
        setTotal(res.data.total);
        delay(() => switchLoading(false), 1000, 'Filtered');
      })
      .catch(err => {
        console.log(err);
        delay(() => switchLoading(false), 1000, 'Filtered');
      });
  };

  useEffect(() => {
    getJobs(pager.page, pager.limit);
  }, [filters.jobposition, filters.title, filters.country, filters.city]);

  const onChange = async (page, limit) => {
    await getJobs(page, limit);
    switchLoading(true);
    updatePager({ ...pager, page, limit });
  };

  return (
    <>
      {(emptyResult && filters.title) || filter.city || !isEmpty(filters.country) ? (
        <Alert style={{ marginBottom: 20 }} message={`No hay resultados de la busqueda "${filters.title || filters.country || filters.city}"`} type="error" />
      ) : null}
      <div className="umana-list">
        {loading ? (
          <div className="app--spinner animated fadeIn in-section">
            <Spin size="large" />
          </div>
        ) : jobs && jobs.length > 0 ? (
          jobs
            .sort((a, b) => (b.created_at > a.created_at ? 1 : -1))
            .map((e, idx) => {
              return (
                <Card
                  key={idx}
                  title={e.title}
                  link={`${auth && auth.token ? '/admin/jobs/single/' : '/jobs/single/'}`}
                  dinamicLink={e.id}
                  description={e.description}
                  theme="green"
                  parentInfo={e.company}
                  date={{ date: e.expiration_date, type: 'Expira' }}
                  align="left"
                />
              );
            })
        ) : (
          <EmptyElemet data={empty} />
        )}
      </div>
      <Pagination current={pager.page} total={total} pageSize={pager.limit} total={total} defaultCurrent={pager.page} onChange={onChange} />
    </>
  );
};

export default PublicJobs;
