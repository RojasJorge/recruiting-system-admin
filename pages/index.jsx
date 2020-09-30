import Home from '../components/Home';
import Router from 'next/router';
import Login from '../components/user/Login';
import { useEffect, useState } from 'react';

const Index = _ => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('uToken')) Router.replace('/admin');
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return <Login />;
};

export default Index;
