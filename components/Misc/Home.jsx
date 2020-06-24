import MainHeader from '../structure/Header';
import Head from 'next/head';
import config from '../../config';
import Link from 'next/link';
import { useStoreState } from 'easy-peasy';

const Home = _ => {
  const user = useStoreState(state => state.auth.user);
  const token = useStoreState(state => state.auth.token);

  return (
    <div className="app app--home">
      <Head>
        <title>{`Home ${config.app.title}`}</title>
      </Head>
      <MainHeader />

      <div className="umana">
        <div className="row umana-layout">
          <div className="col">
            <h1>{`Home directory ${user && token ? 'Logged in' : ''}`}</h1>
            <h3>{config.api}</h3>
          </div>
          <ul>
            <li>
              <Link href="/companies" passHref>
                <a>Busco talentos</a>
              </Link>
            </li>
            <li>
              <Link href="/candidates" passHref>
                <a>Busco trabajo</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
