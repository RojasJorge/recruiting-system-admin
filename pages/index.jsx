import { lazy, Suspense } from "react";
import { StoreProvider } from "easy-peasy";
import store from "../store/store";
import Layout from "../views/Layout";
import PageLoader from "../components/Misc/PageLoader";

const Dashboard = lazy(() => import("../components/user/Dashboard"));

const Index = () => {
  return (
    <StoreProvider store={store}>
      <Layout title="Tablero">
        <Suspense fallback={<PageLoader />}>
          <Dashboard />
        </Suspense>
      </Layout>
    </StoreProvider>
  );
};

export default Index;
