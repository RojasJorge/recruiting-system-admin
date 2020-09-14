import { EmptyElemet } from '../../elements';
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
  return (
    <div className="umana-list list-empty">
      <EmptyElemet id={router.query.id} />
    </div>
  );
};

export default JobsCompanies;
