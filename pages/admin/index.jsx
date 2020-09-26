import { useEffect } from 'react';
import Layout from '../../views/Layout';
import { Form, DatePicker } from 'antd';
import moment from 'moment';

const Admin = _ => {
  useEffect(() => {
    // console.log('Router on admin:', Router);
    if (localStorage.getItem('eToken')) {
      // Router.push("/login");
    }
  }, []);

  // const dateFormat = 'DD/MM/YYYY';
  // const initial = {
  //   birthday: moment('2020-09-20T03:52:35.432Z', dateFormat),
  // };

  return (
    <Layout title="Tablero">
      <>
        <h1>Dashboard</h1>
      </>
    </Layout>
  );
};

export default Admin;
