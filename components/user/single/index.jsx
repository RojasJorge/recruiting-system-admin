import General from './general';
import Contact from './contact';
import About from './about';
import Experience from './experience';
import Academic from './academic';
import Knowledge from './knowledge';
import Economic from './economic';

const SingleProfile = props => {
  
  
  
  const getLocal = field => {
    if (props.data) {
      const local = props.data.profile;
      return local.fields[field];
    } else {
      const local = JSON.parse(localStorage.getItem('uUser'));
      return local.profile.fields[field];
    }
  };
  const getUser = field => {
    if (props.data) {
      const local = props.data;
      return local;
    } else {
      const local = JSON.parse(localStorage.getItem('uUser'));
      return local;
    }
  };

  return (
    <>
      <General data={getLocal('personal')} defaultData={getUser()} />
      <Contact data={getLocal('personal')} defaultData={getUser()} />
      <About data={getLocal('lookingFor')} defaultData={getLocal('personal')} />
      <Experience data={getLocal('working')} />
      <Academic data={getLocal('academic')} />
      <Knowledge data={getLocal('others')} />
      <Economic data={getLocal('economic')} />
    </>
  );
};

export default SingleProfile;
