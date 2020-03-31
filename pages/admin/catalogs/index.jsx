import { lazy, Suspense } from "react";
import { StoreProvider } from "easy-peasy";
import store from "../../../store/store";
import Layout from "../../../views/Layout";
import PageLoader from "../../../components/Misc/PageLoader";

const Catalogs = lazy(() => import("../../../components/catalogs"));

const Index = _ => {
  return (
    <StoreProvider store={store}>
      <Layout title="Catalogos">
        <Suspense fallback={<PageLoader />}>
          <Catalogs />
        </Suspense>
      </Layout>
    </StoreProvider>
  );
};

export default Index;
