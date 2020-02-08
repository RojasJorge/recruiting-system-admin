import { lazy, Suspense } from "react";
import { StoreProvider } from "easy-peasy";
import store from "../../../store/store";
import Layout from "../../../views/Layout";
import PageLoader from "../../../components/Misc/PageLoader";

const UsersList = lazy(() => import("../../../components/user/List"));

const Bills = () => {
  return (
    <StoreProvider store={store}>
      <Layout title="Usuarios">
        <Suspense fallback={<PageLoader />}>
          <UsersList />
        </Suspense>
      </Layout>
    </StoreProvider>
  );
};

export default Bills;
