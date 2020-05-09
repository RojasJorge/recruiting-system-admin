import { lazy, Suspense } from 'react';
import { StoreProvider } from 'easy-peasy';
import store from '../../../store/store';
import Layout from '../../../views/Layout';
import { RollbackOutlined } from '@ant-design/icons';
import PageLoader from '../../../components/Misc/PageLoader';
import Link from 'next/link';
import { PageTitle } from '../../../elements';

const List = lazy(() => import('../../../components/catalogs/List'));

const Professions = () => {
  return (
    <StoreProvider store={store}>
      <Layout title="Profesiones">
        <Suspense fallback={<PageLoader />}>
          <>
        
            <PageTitle title="Profesiones" back="/admin/catalogs" />
            <List type="academic-level" title="Profesiones"  />
          </>
        </Suspense>
      </Layout>
    </StoreProvider>
  );
};

export default Professions;
