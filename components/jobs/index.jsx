import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import xhr from '../../xhr';
import { Card, EmptyElemet, Filter } from '../../elements';
import { isEmpty } from 'lodash';
import { Can } from '../Can';
import { Table } from 'antd';

const columns = [
  {
    title: 'Empresa',
    dataIndex: 'company',
    key: 'company',
    render: (text, record) => <>
      {record.company.name}
    </>
  },
  {
    title: 'Plaza',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: 'Fecha de expiración',
    dataIndex: 'expiration_date',
    key: 'expiration_date'
  },
  {
    title: 'Actions',
    dataIndex: 'id',
    key: 'id',
    render: (text, record) => {
      return(
        <>
          actions
        </>
      )
    }
  },
];

let visible = false;
const Jobs = props => {
  const list = useStoreState(state => state.jobs.list);
  const loading = useStoreState(state => state.jobs.loading)
  const fill = useStoreActions(actions => actions.jobs.fill);
  
  
  const [expiration, setExpiration] = useState([]);
  
  
  const [separatedJobs, setSeparatedJobs] = useState({
    available: [],
    expired: []
  });
  
  
  const collectionsActions = useStoreActions(actions => actions.collections);
  const collectionsState = useStoreState(state => state.collections);

  const getJobs = async (page = 1, offset = 10) => {
    await xhr()
      .get(`/job?page=${page}&offset=${offset}`)
      .then(res => {
        fill(res);
        
        
          const available = res.data.items.reduce((acc, current) => {
            if(renderDate(current.expiration_date)) {
              acc.push(current)
            }
            
            return acc
          }, [])
  
        const expired = res.data.items.reduce((acc, current) => {
          if(!renderDate(current.expiration_date)) {
            acc.push(current)
          }
    
          return acc
        }, [])
        
          setSeparatedJobs({...separatedJobs, available, expired})
        
        
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
    getOptions();
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

  const renderDate = date => {
    const today = new Date();
    const jobDate = new Date(date);
    
    return (today < jobDate)
  }
  
  if (!isEmpty(list)) {
    return (
      <>
        {/*<pre>{JSON.stringify(separatedJobs, false, 2)}</pre>*/}
        {/* <Filter filterVal={addFilter} collectionsState={collectionsState.career} visible={visible} /> */}
        <div className="umana-list">
          {separatedJobs.available.length > 0 && separatedJobs.available.map((e, idx) => {
            
            // if (renderDate(e.expiration_date)) {
              return (
                <Card
                  key={idx}
                  title={e.title}
                  link={`${localStorage.getItem('uToken') ? '/admin/jobs/single/' : '/jobs/single/'}`}
                  dinamicLink={e.id}
                  description={e.description}
                  theme="green"
                  parentInfo={e.company}
                  date={{ date: e.expiration_date, type: 'Expira' }}
                  align="left"
                />
              );
            // } else {
            //   setExpiration({ ...expiration, e });
            //   return null;
            // }
          })}
        </div>
        <Can I="edit" a="JOBS">
          <div className="umana-section">
            <h2>Plazas expiradas</h2>
            <Table columns={columns} dataSource={separatedJobs.expired} rowKey={record => record.id}></Table>
          </div>
        </Can>
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
