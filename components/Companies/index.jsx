import List from './List';
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
      <Button type="circle" size="large">
        <i class="material-icons">add</i>
      </Button>
      <h2>Agregar Empresa</h2>
    </div>
  );
};

export default Companies;
