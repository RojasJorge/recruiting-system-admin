import { useState, useEffect } from "react";
import Router from "next/router";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Form, Input, Button } from "antd";
import "animate.css";

const Login = () => {
  const [loading, switchLoading] = useState(false);
  const token = useStoreState(state => state.auth.token);
  const login = useStoreActions(actions => actions.auth.login);

  const beforeLogin = e => {
    e.preventDefault();
    switchLoading(true);
    login(e.target);
  };

  useEffect(() => {
    token && switchLoading(false);
  }, []);

  return (
    <>
      <div className="app animated fadeIn login container-fluid">
        <div className="row align-items-center justify-content-center app--login">
          <div className="col-md-5">
            <div className="row">
              <div className="col-md-12">
                <h1>Login:</h1>
              </div>
            </div>
            <Form className="login--form" onSubmit={beforeLogin}>
              <Form.Item label="Email">
                <Input
                  name="email"
                  size="large"
                  value="jorge@royalestudios.com"
                  required
                />
              </Form.Item>
              <Form.Item label="Password">
                <Input.Password
                  name="password"
                  size="large"
                  value="royale123"
                  required
                />
              </Form.Item>
              <Button
                htmlType="submit"
                icon="enter"
                size="large"
                type="default"
                loading={loading}
                ghost
              >
                Login
              </Button>
              <Button
                type="link"
                onClick={e => {
                  e.preventDefault();
                  Router.push("/signup");
                }}
              >
                Signup
              </Button>
              <p className="info">Envia Logistics internal metrics system.</p>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
