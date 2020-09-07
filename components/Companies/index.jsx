import Link from 'next/link';
import { Button } from 'antd';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useState, useEffect } from 'react';
import xhr from '../../xhr';
import { Card } from '../../elements';

const Companies = () => {
  const data = useStoreState(state => state.collections);
  const fill = useStoreActions(actions => actions.collections.fill);
  const [company, setCompany] = useState([]);
  /** Get collection */
  const get = () =>
    xhr()
      // .get(`/${type}?pager=${JSON.stringify({ page: 1, limit: 1000 })}`)
      .get(`/company`)
      .then(resp => fill(resp.data))
      .catch(err => console.log(err));

  useEffect(() => {
    setCompany(data.list);
  }, [data.list]);

  useEffect(() => {
    get();
  }, []);

  console.log(company);
  const style = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
    fontSize: 24,
    textDecoration: 'none',
  };
  if (company && company.length > 0) {
    return (
      <div className="umana-list">
        {company.map((e, idx) => (
          <Card
            key={idx}
            title={e.name}
            link={`/admin/companies/${e.id}`}
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
