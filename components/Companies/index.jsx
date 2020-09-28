import Link from 'next/link';
import { Button } from 'antd';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useState, useEffect } from 'react';
import { EmptyElemet } from '../../elements';
import xhr from '../../xhr';
import { Card } from '../../elements';

const Companies = () => {
  const [missing, isMissing] = useState(false);
  const [company, setCompany] = useState([]);
  const data = useStoreState(state => state.companies);
  const fill = useStoreActions(actions => actions.companies.fill);

  useEffect(() => {
    xhr()
      .get(`/company`)
      .then(res => {
        res.type = false; /** This param (if true) loads a collection, false => single object */
        fill(res);
      })
      .catch(err => isMissing(true));
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
  if (data.company && data.company.items && data.company.items.length > 0) {
    return (
      <div className="umana-list">
        {data.company.items.map((e, idx) => (
          <Card key={idx} title={e.name} link={`/admin/companies/`} dinamicLink={e.id} description={e.description} />
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

export default Companies;
