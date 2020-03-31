import { lazy, Suspense } from "react";
import { StoreProvider } from "easy-peasy";
import store from "../../../store/store";
import Layout from "../../../views/Layout";
import PageLoader from "../../../components/Misc/PageLoader";

const Companies = lazy(() => import("../../../components/Companies"));

const Index = _ => {
  return (
    <StoreProvider store={store}>
      <Layout title="Catalogos">
        <Suspense fallback={<PageLoader />}>
          <Companies />
        </Suspense>
      </Layout>
    </StoreProvider>
  );
};

export default Index;
