import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { Card, EmptyElemet } from '../../elements';
import { Spin } from 'antd';
import xhr from '../../xhr';
import { Can } from '../Can';
import { isEmpty } from 'lodash';

const Companies = () => {
  const [status, switchStatus] = useState('loading');
  const [missing, isMissing] = useState(false);
  // const [company, setCompany] = useState([]);
  const data = useStoreState(state => state.companies);
  const fill = useStoreActions(actions => actions.companies.fill);

  useEffect(() => {
    xhr()
      .get(`/company`)
      .then(res => {
        res.type = false;
        /** This param (if true) loads a collection, false => single object */
        fill(res);
        switchStatus('ready');
      })
      .catch(err => {
        isMissing(true);
        switchStatus('ready');
      });
  }, []);

  const style = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
    fontSize: 24,
    textDecoration: 'none',
  };

  const dataEmpty = {
    title: 'Crea el perfil de una empresa',
    content: 'Agregar una empresa para poder crear plazas y empezar tu proceso de reclutamiento.',
    buttonTitle: 'Agregar Empresa',
    url: '/admin/companies/add',
  };
  const dataEmpty1 = {
    title: 'No hay empresas disponibles',
    content: 'Esta vista esta restingida para tu usuario',
    buttonTitle: 'Volver a dashboard',
    url: '/admin',
  };

  return (
    <div className="umana-list">
      {/*SIMPLE LOADING*/}
      {status === 'loading' && <Spin size="large" />}

      {/*SHOW CONTENTS*/}
      {status === 'ready' && !isEmpty(data.company.items) && (
        <div className="umana-list">
          {data.company.items.map((e, idx) => (
            <Card key={idx} title={e.name} link={`/admin/companies/`} avatar={e.avatar} dinamicLink={e.id} description={e.description} align="left" type="company" />
          ))}
        </div>
      )}

      {/*EMPTY ALERT*/}
      {status === 'ready' && data.company.items.length <= 0 ? (
        <>
          <Can I="add" a="COMPANIES">
            <EmptyElemet data={dataEmpty} />
          </Can>
          <Can I="apply" a="JOBS">
            <EmptyElemet data={dataEmpty1} />
          </Can>
        </>
      ) : null}
    </div>
  );
};

export default Companies;
