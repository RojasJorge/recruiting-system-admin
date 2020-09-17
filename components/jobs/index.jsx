// import List from './List';
import Link from 'next/link';
import { Button } from 'antd';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useEffect } from 'react';
import { EmptyElemet } from '../../elements';
import xhr from '../../xhr';

const Jobs = () => {
  const data = useStoreState(state => state.jobs);
  const fill = useStoreActions(actions => actions.jobs.fill);

  useEffect(() => {
    xhr()
      .get(`/company`)
      .then(res => {
        res.type = false; /** This param (if true) loads a collection, false => single object */
        fill(res);
      })
      .catch(err => isMissing(true));
  }, []);

  console.log('jobs', data);

  const dataEmpty = {
    title: 'No tienes ninguna plaza publicada',
    content: 'Selecciona una empresa y publica una plaza para poder ver candidatos que se ajusten al perfil que necesitas.',
    buttonTitle: 'Agregar plaza',
    url: '/admin/companies',
  };
  return (
    <div className="umana-list list-empty">
      <EmptyElemet data={dataEmpty} />
    </div>
  );
};

export default Jobs;
