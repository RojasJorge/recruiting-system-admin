import React, { useEffect, useState } from 'react';
import MainHeader from '../structure/Header';
import Head from 'next/head';
import config from '../../config';
import Welcome from './welcome';
import { useStoreState } from 'easy-peasy';

const Home = _ => {
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [positions, setPosition] = useState([]);
  const [areas, setAreas] = useState([]);

  // useEffect(() => {
  //   getCompanies();
  //   getJobs();
  //   getPositions();
  // }, []);

  // const getCompanies = async () => {
  //   const responde = await api.company.action.get({ status: true });
  //   if (responde.status === 200) {
  //     setCompanies(responde.data);
  //   }
  // };

  // const getJobs = async () => {
  //   const responde = await api.jobs.action.get({});
  //   if (responde.status === 200) {
  //     setJobs(responde.data);
  //   }
  // };
  // const getPositions = async () => {
  //   const responde = await api.career.action.get({ status: true });
  //   if (responde.status === 200) {
  //     const parents = responde.data.filter(o => o.parent === null || o.parent === '');
  //     const children = responde.data.filter(i => i.parent !== null || i.parent !== '');
  //     setAreas(parents);
  //     setPosition(children);
  //   }
  // };
  const user = useStoreState(state => state.auth.user);
  const token = useStoreState(state => state.auth.token);

  return (
    <div className="app app--home">
      <Head>
        <title>{`Home ${config.app.title}`}</title>
      </Head>
      <MainHeader />

      <Welcome />
    </div>
  );
};

export default Home;
