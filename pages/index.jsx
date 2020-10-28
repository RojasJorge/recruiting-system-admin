import Router from 'next/router';
import Login from '../components/user/Login';
import { useEffect, useState } from 'react';
import { useStoreState } from 'easy-peasy';
import { delay } from 'lodash';
import { Spin } from 'antd';

const Index = _ => {
  const [loading, setLoading] = useState(true);

  const auth = useStoreState(state => state.auth);

  useEffect(() => {
    if (auth.user) {
      if (auth.user && auth.token) {
        Router.push('/admin');
      }
    } else {
      delay(_ => {
        setLoading(false);
      }, 1000);
    }
  }, [auth.user, auth.token]);

  if (loading) {
    return (
      <div className="app--spinner animated fadeIn">
        <Spin tip="Cargando.." size="large" />
      </div>
    );
  } else {
    return <Login />;
  }
};

export default Index;
