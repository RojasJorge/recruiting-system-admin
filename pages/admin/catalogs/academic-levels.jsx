import { lazy, Suspense } from "react";
import { StoreProvider } from "easy-peasy";
import store from "../../../store/store";
import Layout from "../../../views/Layout";
import PageLoader from "../../../components/Misc/PageLoader";

const List = lazy(() => import("../../../components/catalogs/List"));

const AcademicLevels = () => {
  return (
    <StoreProvider store={store}>
      <Layout title="Niveles académicos">
        <Suspense fallback={<PageLoader />}>
          <List type="academic-levels" />
        </Suspense>
      </Layout>
    </StoreProvider>
  );
};

export default AcademicLevels;
