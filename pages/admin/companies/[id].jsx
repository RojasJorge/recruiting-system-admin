import { lazy, Suspense } from "react";
import { StoreProvider } from "easy-peasy";
import store from "../../../store/store";
import Layout from "../../../views/Layout";
import PageLoader from "../../../components/Misc/PageLoader";

const Single = lazy(() => import("../../../components/Companies/Single"));

const SingleCompany = _ => (
  <StoreProvider store={store}>
    <Layout title="Single company">
      <Suspense fallback={<PageLoader />}>
        <Single />
      </Suspense>
    </Layout>
  </StoreProvider>
);

export default SingleCompany;
