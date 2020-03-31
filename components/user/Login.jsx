import { useState, useEffect } from "react";
import Head from "next/head";
import Router from "next/router";
import { useStoreActions } from "easy-peasy";
import { SyncOutlined } from "@ant-design/icons";
import { Form, Input, Button } from "antd";
import { EnterOutlined } from "@ant-design/icons";
import { delay } from "lodash";
import MainHeader from "../structure/Header";
import imgLogin from "../../public/login.png";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import "antd/dist/antd.css";
import "../../assets/css/_structure.scss";
import "animate.css";

const Login = _ => {
  const [loading, switchLoading] = useState(true);
  const [form] = Form.useForm();
  const login = useStoreActions(actions => actions.auth.login);
  const [token, settoken] = useState(false);

  const onFinish = data => {
    switchLoading(true);
    login(data);

    /** Switch loader delay */
    delay(() => switchLoading(false), 1000);
  };

  useEffect(() => {
    if (localStorage.getItem("eToken")) {
      settoken(true);
    }
    delay(() => switchLoading(false), 1000);
  }, []);

  return token ? (
    console.log("error on login")
    // (window.location.href = "/admin/profile")
  ) : (
    <>
      {!token ? (
        <>
          <Head>
            <title>Login</title>
          </Head>
          <div className="app animated fadeIn login container">
            <MainHeader />
            <div className="row align-items-center justify-content-center app--login">
              <div className="col-md-6">left contests</div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-12">
                    <h1>Login:</h1>
                    <img src={imgLogin} alt="" />
                  </div>
                </div>
                <Form
                  className="login--form"
                  form={form}
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Correo electrónico es requerido."
                      }
                    ]}
                    name="email"
                  >
                    <Input size="large" />
                  </Form.Item>
                  <Form.Item
                    rules={[
                      { required: true, message: "Contraseña es requerida." }
                    ]}
                    name="password"
                  >
                    <Input.Password size="large" />
                  </Form.Item>
                  <Button
                    icon={<EnterOutlined />}
                    size="large"
                    htmlType="submit"
                    type="primary"
                    loading={loading}
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
                </Form>
              </div>
            </div>
          </div>
        </>
      ) : (
        "loading..."
      )}
    </>
  );
};

export default Login;
