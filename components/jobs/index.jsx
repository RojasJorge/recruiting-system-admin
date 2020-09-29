import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import xhr from '../../xhr';
import { Card, EmptyElemet, Filter } from '../../elements';
import { isEmpty } from 'lodash';

let visible = false;
const Jobs = () => {
  const list = useStoreState(state => state.jobs.list);
  const fill = useStoreActions(actions => actions.jobs.fill);
  const [expiration, setExpiration] = useState([]);
  const [result, setResult] = useState(list);

  const getJobs = async (page = 1, offset = 5) => {
    await xhr()
      .get(`/job?page=${page}&offset=${offset}`)
      .then(res => {
        fill(res);
        console.log(res);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    getJobs();
  }, []);

  const addFilter = e => {
    const _jobs = list.filter(o => o.jobposition === e);
    const data = { data: { items: _jobs } };
    if (_jobs.length > 0) {
      visible = false;
      setResult(_jobs);
    } else {
      visible = true;
      setResult(list);
    }
  };

  const dataEmpty = {
    title: 'No tienes ninguna plaza publicada',
    content: 'Selecciona una empresa y publica una plaza para poder ver candidatos que se ajusten al perfil que necesitas.',
    buttonTitle: 'Agregar plaza',
    url: '/admin/companies',
  };

  if (!isEmpty(list)) {
    return (
      <>
        {/* <pre>{JSON.stringify(list, false, 2)}</pre> */}
        <Filter filterVal={addFilter} visible={visible} />
        <div className="umana-list">
          {result.map((e, idx) => {
            const today = new Date();
            const jobDate = new Date(e.expiration_date);
            if (today < jobDate) {
              return (
                <Card
                  key={idx}
                  title={e.title}
                  link={`/admin/jobs/single/`}
                  dinamicLink={e.id}
                  description={e.description}
                  theme="green"
                  parentInfo={e.company}
                  // date={{ date: e.expiration_date, type: 'Expira' }}
                  align="left"
                />
              );
            } else {
              setExpiration({ ...expiration, e });
              return null;
            }
          })}
        </div>
        {/* <div className="umana-section">
          <h2>Plazas expiradas</h2>

        </div> */}
      </>
    );
  }
  return (
    <div className="umana-list list-empty">
      <EmptyElemet data={dataEmpty} />
    </div>
  );
};

export default Jobs;
