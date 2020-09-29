import General from './general';
import Contact from './contact';
import About from './about';
import Experience from './experience';
import Academic from './academic';
import Knowledge from './knowledge';
import Economic from './economic';

const SingleProfile = () => {
  const getLocal = field => {
    const local = JSON.parse(localStorage.getItem('uUser'));
    return local.profile.fields[field];
  };
  const getUser = field => {
    const local = JSON.parse(localStorage.getItem('uUser'));
    return local;
  };

  return (
    <>
      <General data={getLocal('personal')} defaultData={getUser()} />
      <Contact data={getLocal('personal')} defaultData={getUser()} />
      <About data={getLocal('lookingFor')} defaultData={getLocal('personal')} />
      <Experience data={getLocal('working')} />
      <Academic data={getLocal('academic')} />
      <Knowledge />
      <Economic data={getLocal('economic')} />
    </>
  );
};

export default SingleProfile;
