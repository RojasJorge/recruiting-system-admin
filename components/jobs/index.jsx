// import List from './List';
import Link from 'next/link';
import { Button } from 'antd';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { EmptyElemet, Card } from '../../elements';
import xhr from '../../xhr';
import { isEmpty } from 'lodash';

const Jobs = () => {
  const data = useStoreState(state => state.jobs);
  const fill = useStoreActions(actions => actions.jobs.fill);
  const [missing, isMissing] = useState(false);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    xhr()
      .get(`/job`)
      .then(res => {
        res.type = false;
        console.log('jobs loop respuesta', res);
        setJobs(res.data);
        fill(res.data);
      })
      .catch(err => isMissing(true));
  }, []);

  const dataEmpty = {
    title: 'No tienes ninguna plaza publicada',
    content: 'Selecciona una empresa y publica una plaza para poder ver candidatos que se ajusten al perfil que necesitas.',
    buttonTitle: 'Agregar plaza',
    url: '/admin/companies',
  };

  console.log('plazas', jobs);
  if (jobs && !isEmpty(jobs)) {
    return (
      <div className="umana-list">
        {jobs.items.map((e, idx) => (
          <Card key={idx} title={e.title} link={`/admin/jobs/single/`} dinamicLink={e.id} description={e.description} theme="green" parentInfo={e.company} align="left" />
        ))}
      </div>
    );
  }
  return (
    <div className="umana-list list-empty">
      <EmptyElemet data={dataEmpty} />
    </div>
  );
};

export default Jobs;
