import { lazy, Suspense } from "react";
import { StoreProvider } from "easy-peasy";
import store from "../../../store/store";
import Layout from "../../../views/Layout";
import { RollbackOutlined } from "@ant-design/icons";
import PageLoader from "../../../components/Misc/PageLoader";
import Link from "next/link";

const List = lazy(() => import("../../../components/catalogs/List"));

const Professions = () => {
  return (
    <StoreProvider store={store}>
      <Layout title="Profesiones">
        <Suspense fallback={<PageLoader />}>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <Link href="/admin/catalogs" passHref>
                  <a>
                    <RollbackOutlined /> Catálogos
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <List type="academic-level" title="Profesiones" />
        </Suspense>
      </Layout>
    </StoreProvider>
  );
};

export default Professions;
