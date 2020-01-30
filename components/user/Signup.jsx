import { Form, Input, Button, DatePicker } from "antd";
import Router from "next/router";
import "animate.css";

const SignupForm = () => {
  // const
  return (
    <>
      <div className="app signup container-fluid animated fadeIn">
        <div className="row align-items-center justify-content-center app--signup">
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-12">
                <h1>Signup:</h1>
              </div>
            </div>
            <Form className="signup--form">
              <div className="row">
                <div className="col">
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
                </div>
                <div className="col">
                  <Form.Item label="Name">
                    <Input name="name" size="large" required />
                  </Form.Item>
                  <Form.Item label="Lastname">
                    <Input name="lastname" size="large" required />
                  </Form.Item>
                </div>
                <div className="col-md-12">
                  <h3>Optional:</h3>
                </div>
                <div className="col">
                  <Form.Item label="Phone(s)">
                    <Input
                      name="phone"
                      size="large"
                      placeholder="Eg. 0000-0000, 54343212"
                      required
                    />
                  </Form.Item>
                </div>
                <div className="col">
                  <Form.Item label="Birthday">
                    <DatePicker style={{ width: "100%" }} size="large" />
                  </Form.Item>
                </div>
              </div>
              <Button
                htmlType="submit"
                icon="plus"
                size="large"
                type="default"
                // loading={loading}
                ghost
              >
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
