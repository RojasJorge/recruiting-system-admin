import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import xhr from '../../xhr';
import { Card, EmptyElemet } from '../../elements';
import { isEmpty } from 'lodash';

const Jobs = () => {
  const list = useStoreState(state => state.jobs.list);
  const fill = useStoreActions(actions => actions.jobs.fill);
  const [expiration, setExpiration] = useState([]);
  
  const getJobs = async (page = 1, offset = 5) =>
    await xhr()
      .get(`/job?page=${page}&offset=${offset}`)
      .then(res => fill(res))
      .catch(err => console.log(err));
      // .catch(err => isMissing(true));

  useEffect(() => {
    // getJobs()
  }, []);

  const dataEmpty = {
    title: 'No tienes ninguna plaza publicada',
    content: 'Selecciona una empresa y publica una plaza para poder ver candidatos que se ajusten al perfil que necesitas.',
    buttonTitle: 'Agregar plaza',
    url: '/admin/companies',
  };

  // console.log('plazas', expiration);
  if (!isEmpty(list)) {
    return (
      <>
        <pre>{JSON.stringify(list, false, 2)}</pre>
        <div className="umana-list">
          {list.map((e, idx) => {
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
