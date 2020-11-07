import General from './general';
import Contact from './contact';
import About from './about';
import Experience from './experience';
import Academic from './academic';
import Knowledge from './knowledge';
import Economic from './economic';
import { useEffect, useState } from 'react';
import xhr from '../../../xhr';
import {Skeleton} from "antd";

const SingleProfileCandidate = ({ query, data }) => {
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);

  const getUser = () => {
    xhr()
      .get(`/user/${query.id}`)
      .then(res => {
        setUser(res.data);
      })
      .catch(console.error);
  };
  const getProfile = () => {
    xhr()
      .get(`/profile?uid=${query.id}`)
      .then(res => {
        setProfile(res.data[0]);
      })
      .catch(console.error);
  };

  useEffect(() => {
    getUser();
    getProfile();
  }, []);

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, []);
  
  if (!profile) return <Skeleton active />;
  return (
    <>
      <General data={profile.fields.personal} defaultData={user} />
      <Contact data={profile.fields.personal} defaultData={user} />
      <About data={profile.fields.lookingFor} defaultData={profile.fields.personal} />
      <Experience data={profile.fields.working} />
      <Academic data={profile.fields.academic} />
      <Knowledge data={profile.fields.others} />
      <Economic data={profile.fields.economic} />
    </>
  );
};

export default SingleProfileCandidate;
