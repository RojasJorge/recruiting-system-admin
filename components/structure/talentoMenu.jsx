import { useState, useEffect } from 'react';
import { Menu, Modal, Button } from 'antd';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Link from 'next/link';
import Router from 'next/router';

const UserMenu = props => {
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
      className: 'theme-orange',
      title: 'Cerrar Sesión',
      content: '¿Está seguro que desea cerrar sesión?',
      centered: true,
      okText: 'Salir',
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
          className="menu--main umana-menu theme-orange"
        >
          <Menu.Item key="admin/users" className="menu-role">
            Talentos
          </Menu.Item>
          <Menu.Item key="admin/companies">Empresas</Menu.Item>
          <Menu.SubMenu
            title={
              <span className="submenu-title-wrapper">
                {props.user.name + ' ' + props.user.lastname}
              </span>
            }
          >
            <Menu.Item key="admin/profile">
              <div className="content">
                <div className="user-icon">
                  <i className="material-icons">person_pin</i>
                </div>
                <div>
                  <p>{props.user.name + ' ' + props.user.lastname}</p>
                  <p>{props.user.email}</p>
                </div>
                <Button type="orange" size="small">
                  Mi perfil
                </Button>
              </div>
            </Menu.Item>
            <Menu.Item key="admin/privacidad">Configuración</Menu.Item>
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
      <div className="menu--talento">
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
                <Menu.Item key="admin">Inicio</Menu.Item>
                <Menu.Item key="admin/profile">Mi perfil</Menu.Item>
                <Menu.Item>Plazas Disponibles</Menu.Item>
                <Menu.Item>Mis Plazas</Menu.Item>
                <Menu.Item>Notificaciones</Menu.Item>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
