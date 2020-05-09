import { lazy, Suspense } from "react";
import { StoreProvider } from "easy-peasy";
import { RollbackOutlined } from "@ant-design/icons";
import store from "../../../store/store";
import Layout from "../../../views/Layout";
import PageLoader from "../../../components/Misc/PageLoader";
import { PageTitle } from '../../../elements';

const List = lazy(() => import("../../../components/catalogs/List"));

const AcademicLevels = () => {
  return (
    <StoreProvider store={store}>
      <Layout title="Niveles académicos">
        <Suspense fallback={<PageLoader />}>
          <>
          <PageTitle title="Niveles Académicos" back="/admin/catalogs" />
          <List type="career" title="Niveles Académicos" />
          </>
        </Suspense>
      </Layout>
    </StoreProvider>
  );
};

export default AcademicLevels;
