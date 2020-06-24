import HomeLayout from '../../views/HomeLayout';
import CandidatesHome from '../../components/Home/Candidate';

const Index = _ => {
  return (
    <>
      <HomeLayout title="Candidatos">
        <CandidatesHome />
      </HomeLayout>
    </>
  );
};

export default Index;
