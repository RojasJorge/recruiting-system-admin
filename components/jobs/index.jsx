import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import xhr from '../../xhr';
import { Card, EmptyElemet, Filter } from '../../elements';
import { isEmpty } from 'lodash';

let visible = false;
const Jobs = props => {
  const list = useStoreState(state => state.jobs.list);
  const fill = useStoreActions(actions => actions.jobs.fill);
  const [expiration, setExpiration] = useState([]);
  // const [result, setResult] = useState(list);
  const collectionsActions = useStoreActions(actions => actions.collections);
  const collectionsState = useStoreState(state => state.collections)

  const getJobs = async (page = 1, offset = 50) => {
    await xhr()
      .get(`/job?page=${page}&offset=${offset}`)
      .then(res => {
        // fill(res);
        // console.log('getJobs()', res);
        // setResult(res.data.items);
      })
      .catch(err => console.log(err));
  };
  
  const getOptions = async () => {
    await xhr()
      .get(`/career`)
      .then(res => {
        res.type = false;
        collectionsActions.fill({ data: res.data, type: 'career' });
      })
      .catch(err => console.log(err));
  };
  
  const get = () => {
    collectionsActions.get({ type: 'career' });
    collectionsActions.get({ type: 'academic_level' });
  };

  useEffect(() => {
    getJobs();
    getOptions()
    if (!isEmpty(list)) {
      // setResult(list);
    }
    get();
  }, []);

  const addFilter = e => {
    const _jobs = list.filter(o => o.jobposition === e);
    const data = { data: { items: _jobs } };
    if (_jobs.length > 0) {
      visible = false;
      // setResult(_jobs);
    } else {
      visible = true;
      // setResult(list);
    }
  };

  if (!isEmpty(list)) {
    return (
      <>
        <Filter filterVal={addFilter} collectionsState={collectionsState.career} visible={visible} />
        <div className="umana-list">
          {list.map((e, idx) => {
            const today = new Date();
            const jobDate = new Date(e.expiration_date);
            if (today < jobDate) {
              return (
                <Card
                  key={idx}
                  title={e.title}
                  link={`${localStorage.getItem('uToken') ? '/admin/jobs/single/' : '/jobs/'}`}
                  dinamicLink={e.id}
                  description={e.description}
                  theme="green"
                  parentInfo={e.company}
                  date={{ date: e.expiration_date, type: 'Expira' }}
                  align="left"
                />
              );
            } else {
              setExpiration({ ...expiration, e });
              return null;
            }
          })}
        </div>
        <div className="umana-section">
          <h2>Plazas expiradas</h2>
        </div>
      </>
    );
  }
  return (
    <div className="umana-list list-empty">
      <EmptyElemet data={props.empty} />
    </div>
  );
};

export default Jobs;
