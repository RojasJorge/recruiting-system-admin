import Link from 'next/link';
import { Button } from 'antd';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useState, useEffect } from 'react';
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
  if (data.company && data.company.items && data.company.items.length > 0) {
    return (
      <div className="umana-list">
        {data.company.items.map((e, idx) => (
          <Card
            key={idx}
            title={e.name}
            link={`/admin/companies/`}
            dinamicLink={e.id}
            description={e.description}
          />
        ))}
      </div>
    );
  }
  return (
    <div className="umana-list list-empty">
      <Link href="/admin/companies/add">
        <a>
          <Button type="circle" size="large">
            <i className="material-icons">add</i>
          </Button>
        </a>
      </Link>
      <h2>Agregar Empresa</h2>
    </div>
  );
};

export default Companies;
