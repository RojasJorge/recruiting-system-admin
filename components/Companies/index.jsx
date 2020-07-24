import List from './List';
import Link from 'next/link';
import { Button } from 'antd';
const Companies = () => {
  const style = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
    fontSize: 24,
    textDecoration: 'none',
  };
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
