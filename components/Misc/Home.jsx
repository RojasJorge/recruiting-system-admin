import MainHeader from "../structure/Header";
import Head from "next/head";
import config from "../../config";
import { useStoreState } from "easy-peasy";
import "bootstrap/dist/css/bootstrap-grid.min.css";

const Home = _ => {
  const user = useStoreState(state => state.auth.user);
  const token = useStoreState(state => state.auth.token);

  return (
    <div className="app app--home">
      <Head>
        <title>{`Home ${config.app.title}`}</title>
      </Head>
      <MainHeader />
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>{`Home directory ${user && token ? "Logged in" : ""}`}</h1>
            <h3>{config.api}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
