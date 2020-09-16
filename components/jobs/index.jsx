// import List from './List';
import Link from 'next/link';
import { Button } from 'antd';
import { EmptyElemet } from '../../elements';

const Jobs = () => {
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
