import { useState, useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import Link from "next/link";
import { Menu, Modal } from "antd";
import { LogoutOutlined, UsergroupAddOutlined, HomeOutlined, DownOutlined, UserOutlined, OrderedListOutlined, DashOutlined } from "@ant-design/icons";
import Router from "next/router";
import UmanaLogo from "../Misc/UmanaLogo";

const MainMenu = _ => {
  const isMain = /\/[a-z]/i;
  const [current, setCurrent] = useState("/");

  const user = useStoreState(state => state.auth.user);
  const signOut = useStoreActions(actions => actions.auth.logout);

  const handleClick = e => {
    if (e.key === "logout") {
      return;
    }

    /** Switch changes. */
    setCurrent(e.key);
    Router.push(`/${e.key === "dashboard" ? "" : e.key}`);
  };

  const handleLogout = () =>
    Modal.confirm({
      content: "Confirm logout?",
      okText: "Logout",
      onOk: () => {
        Router.push("/");
        signOut();
      }
    });

  useEffect(() => {
    setCurrent(
      !Router.pathname.match(isMain)
        ? "dashboard"
        : Router.pathname.replace("/", "")
    );
  }, []);

  return user ? (
    <>
      <div className="menu--user">
        <div className="container">
          <div className="row align-items-center">
            <div className="col">
              <UmanaLogo />
            </div>
            <div className="col">
              <Menu
                trigger="click"
                mode="horizontal"
                onClick={handleClick}
                selectedKeys={[current]}
                className="menu--main"
              >
                <Menu.Item key="admin/companies">Empresas</Menu.Item>
                <Menu.SubMenu
                  title={
                    <span className="submenu-title-wrapper">
                      {user.name} <DownOutlined />
                    </span>
                  }
                >
                  <Menu.Item key="admin/profile">
                    <UserOutlined />
                    Mi perfil
                  </Menu.Item>
                  <Menu.Item key="logout">
                    <a
                      href="#"
                      onClick={e => {
                        e.preventDefault();
                        handleLogout();
                      }}
                    >
                      <LogoutOutlined /> Cerrar sesión
                    </a>
                  </Menu.Item>
                </Menu.SubMenu>
              </Menu>
            </div>
          </div>
        </div>
      </div>
      {/*App menu*/}
      <div className="menu--admin">
        <div className="container">
          <div className="row">
            <div className="col">
              <Menu
                onClick={handleClick}
                selectedKeys={[current]}
                mode="horizontal"
                theme="dark"
                style={{
                  backgroundColor: "transparent",
                  textAlign: "right"
                }}
              >
                <Menu.Item key="admin/catalogs">
                  <OrderedListOutlined />
                  Catalogos
                </Menu.Item>
                <Menu.Item key="dashboard">
                  <DashOutlined />
                  Tablero
                </Menu.Item>
                <Menu.Item key="admin/users">
                  <UsergroupAddOutlined />
                  Usuarios
                </Menu.Item>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="menu--user menu--user__login">
      <div className="container">
        <div className="row align-items-center">
          <div className="col">
            <UmanaLogo />
          </div>
          <div className="col access-links">
            {current === "login" ? (
              <Link href="/" passHref>
                <a>
                  <HomeOutlined />
                </a>
              </Link>
            ) : (
              <Link href="/login" passHref>
                <a>Entrar</a>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
