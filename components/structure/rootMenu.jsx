import { useState, useEffect } from 'react';
import { Menu, Modal } from 'antd';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Link from 'next/link';
import Router from 'next/router';

const UmanaMenu = props => {
  const [current, setCurrent] = useState('/');
  const signOut = useStoreActions(actions => actions.auth.logout);
  const handleClick = e => {
    if (e.key === 'logout') {
      return;
    }

    /** Switch changes. */
    setCurrent(e.key);
    Router.push(`/${e.key === 'dashboard' ? '' : e.key}`);
  };

  const handleLogout = () =>
    Modal.confirm({
      content: 'Confirm logout?',
      okText: 'Logout',
      onOk: () => {
        Router.push('/');
        signOut();
      },
    });

  return (
    <>
      <div className="col">
        <Menu
          trigger="click"
          mode="horizontal"
          onClick={handleClick}
          selectedKeys={[current]}
          className="menu--main umana-menu"
        >
          <Menu.Item key="dashboard" className="menu-role">
            Umana
          </Menu.Item>
          <Menu.Item key="admin/users">Talentos</Menu.Item>
          <Menu.Item key="admin/companies">Empresas</Menu.Item>
          <Menu.SubMenu
            title={
              <span className="submenu-title-wrapper">
                {props.user.name + ' ' + props.user.lastname}
              </span>
            }
          >
            <Menu.Item key="admin/profile">Mi perfil</Menu.Item>
            <Menu.Item key="logout">
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  handleLogout();
                }}
              >
                Cerrar sesión
              </a>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </div>
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
                  backgroundColor: 'transparent',
                  textAlign: 'right',
                }}
              >
                <Menu.Item key="dashboard">Inicio</Menu.Item>
                <Menu.Item key="admin/catalogs">Catalogos</Menu.Item>
                <Menu.Item>Notificaciones</Menu.Item>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UmanaMenu;
