import Head from "next/head";
import { Form, Input, Button, DatePicker } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Router from "next/router";
import "cleave.js/dist/addons/cleave-phone.gt";
import Cleave from "cleave.js/react";
import "animate.css";

const SignupForm = _ => {
  /** Submit handler */
  const onSubmit = e => {
    e.preventDefault();
    console.log(
      e.target.name.value,
      e.target.lastname.value,
      e.target.email.value,
      e.target.phone.value,
      e.target.birthday.value,
      "password",
      e.target.password.value
    );
  };

  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Head>
        <title>Signup</title>
      </Head>
      <div className="app signup container-fluid animated fadeIn">
        <div className="row align-items-center justify-content-center app--signup">
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-12">
                <h1>Signup:</h1>
              </div>
            </div>
            <Form 
            name="basic"
              className="signup--form" 
              onSubmit={onSubmit} 
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}>
              <div className="row">
                <div className="col-md-6">
                  <Form.Item label="Email">
                    <Input
                      name="email"
                      size="large"
                      value="jorge@royalestudios.com"
                      rules={[{ required: true, message: 'Please input your email!' }]}
                    />
                  </Form.Item>
                </div>
                <div className="col-md-6">
                  <Form.Item label="Password">
                    <Input.Password
                      name="password"
                      size="large"
                      value="royale123"
                      rules={[{ required: true, message: 'Please input your password!' }]}
                    />
                  </Form.Item>
                </div>
                <div className="col-md-6">
                  <Form.Item label="Name">
                    <Input name="name" size="large" rules={[{ required: true, message: 'Please input your username!' }]} />
                  </Form.Item>
                </div>
                <div className="col-md-6">
                  <Form.Item label="Lastname">
                    <Input name="lastname" size="large" />
                  </Form.Item>
                </div>
                <div className="col-md-12">
                  <h3>Optional:</h3>
                </div>
                <div className="col">
                  <Form.Item label="Phone(s)">
                    <Cleave
                      className="ant-input ant-input-lg"
                      options={{
                        phone: true,
                        phoneRegionCode: "GT"
                      }}
                      name="phone"
                      onChange={e => console.log(e.target.value)}
                    />
                  </Form.Item>
                </div>
                <div className="col">
                  <Form.Item label="Birthday">
                    <DatePicker
                      style={{ width: "100%" }}
                      format="DD/MM/YYYY"
                      size="large"
                      name="birthday"
                    />
                  </Form.Item>
                </div>
              </div>
              <Button htmlType="submit" icon={<PlusOutlined />} size="large" type="primary">
                Register new user
              </Button>
              <Button
                type="link"
                onClick={e => {
                  e.preventDefault();
                  Router.push("/login");
                }}
              >
                Login
              </Button>
              <p className="info">Envia Logistics internal metrics system.</p>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
