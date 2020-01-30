import { useState, useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Menu, Icon, Avatar, Modal } from "antd";
import Router from "next/router";

const MainMenu = () => {
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

  const handleLogout = () => {
    Modal.confirm({
      content: "Confirm logout?",
      okText: "Logout",
      onOk: () => {
        Router.push("/");
        signOut();
      }
    });
  };

  useEffect(() => {
    setCurrent(
      !Router.pathname.match(isMain)
        ? "dashboard"
        : Router.pathname.replace("/", "")
    );
  }, []);

  return (
    <aside className="app--sidebar">
      <div
        style={{
          textAlign: "left",
          padding: "24px 24px 0px 24px"
        }}
      >
        <Avatar
          size={65}
          icon="user"
          style={{ display: "inline-block", marginBottom: 15 }}
        />
      </div>
      <Menu
        onClick={handleClick}
        selectedKeys={[current]}
        mode="inline"
        theme="dark"
      >
        <Menu.Item key="admin/profile">
          <Icon type="user" />
          {user.name}
        </Menu.Item>
        <Menu.Item key="dashboard">
          <Icon type="dashboard" />
          Dashboard
        </Menu.Item>
        <Menu.Item key="admin/users">
          <Icon type="file-search" />
          Users
        </Menu.Item>
        <Menu.Item key="logout">
          <a
            style={{ color: "#ffffff" }}
            href="#"
            onClick={e => {
              e.preventDefault();
              handleLogout();
            }}
          >
            <Icon type="logout" /> Cerrar sesión
          </a>
        </Menu.Item>
      </Menu>
    </aside>
  );
};

export default MainMenu;
