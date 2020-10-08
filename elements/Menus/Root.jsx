import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'antd';
import Proptypes from 'prop-types';
import router from 'next/router'

const RootNav = props => {
  const [current, setCurrent] = useState('/');

  return (
    <Menu
      mode={`${props.direction}`}
      id="header-nav"
      selectedKeys={[current]}
      className={`header-nav umana-menu nav-desktop theme-${props.theme}`}
    >
      <Menu.Item key="dashboard" onClick={e => props.close(e, 'close')}>
        <Link href="/admin" passHref>
          <a>Dashboard</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="candidatos" onClick={e => props.close(e, 'close')}>
        <Link href="/admin/users" passHref>
          <a>Usuarios</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="companies" onClick={e => props.close(e, 'close')}>
        <Link href="/admin/companies" passHref>
          <a>Empresas</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="plazas" onClick={e => props.close(e, 'close')}>
        <Link href="/admin/jobs" passHref>
          <a>Plazas</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="applications" onClick={e => props.close(e, 'close')}>
        <Link href="/admin/applications" passHref>
          <a>Aplicaciones</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="catalogos" onClick={e => props.close(e, 'close')}>
        <Link href="/admin/catalogs" passHref>
          <a>Catalogos</a>
        </Link>
      </Menu.Item>
    </Menu>
  );
};

RootNav.propTypes = {
  close: Proptypes.func,
};

RootNav.defaultProps = {
  close: () => {},
};

export default RootNav;
