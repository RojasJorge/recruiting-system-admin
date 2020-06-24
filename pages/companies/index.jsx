import HomeLayout from '../../views/HomeLayout';
import CompaniesHome from '../../components/Home/Companies';

const Index = _ => {
  return (
    <>
      <HomeLayout title="Candidatos">
        <CompaniesHome />
      </HomeLayout>
    </>
  );
};

export default Index;
