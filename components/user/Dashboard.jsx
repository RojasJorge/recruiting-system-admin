import { useState, useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Card, Statistic } from "antd";

const Dashboard = () => {
  const auth = useStoreState(state => state.auth);
  const totalUsers = useStoreState(state => state.users.total);
  const getUsers = useStoreActions(actions => actions.users.get);
  useEffect(() => {
    getUsers(auth.token);
  }, []);
  return (
    <>
      <h1>Tablero</h1>
      <div className="row">
        <div className="col">
          <Card>
            <Statistic title="Active Users" value={5} />
          </Card>
        </div>
        <div className="col">
          <Card>
            <Statistic title="Total bills" value={totalUsers} />
          </Card>
        </div>
        <div className="col">
          <Card>
            <Statistic title="Stacked transactions" value={12344} />
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
