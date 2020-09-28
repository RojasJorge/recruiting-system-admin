import { EmptyElemet } from '../../../elements';
import { useRouter } from 'next/router';

const JobsCompanies = () => {
  const router = useRouter();
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
    content: 'Publica una plaza para poder ver candidatos que se ajusten al perfil que necesitas.',
    buttonTitle: 'Agregar plaza',
    url: '/admin/jobs/add/',
    id: router.query.id,
  };
  return (
    <div className="umana-list list-empty">
      <EmptyElemet data={dataEmpty} />
    </div>
  );
};

export default JobsCompanies;
