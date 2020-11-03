import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'antd';
import Proptypes from 'prop-types';
import router from 'next/router'

const CompanyNav = props => {
  const [current, setCurrent] = useState('/');

  const handleClick = e => {
    if (e.key === 'logout') {
      return;
    }
    /** Switch changes. */
    setCurrent(e.key);
    router.push(`/admin/${e.key === 'dashboard' ? '' : e.key}`);
  };

  return (
    <Menu
      mode={`${props.direction}`}
      id="header-nav"
      // onClick={handleClick}
      selectedKeys={[current]}
      className={`header-nav umana-menu nav-desktop theme-${props.theme}`}
    >
      <Menu.Item key="requests" onClick={e => props.close(e, 'close')}>
        <Link href="/admin/requests" passHref>
          <a>Solicitudes</a>
        </Link>
      </Menu.Item>
      {/*<Menu.Item key="dashboard" onClick={e => props.close(e, 'close')}>*/}
      {/*  <Link href="/admin" passHref>*/}
      {/*    <a>Dashboard</a>*/}
      {/*  </Link>*/}
      {/*</Menu.Item>*/}
      <Menu.Item key="companies" onClick={e => props.close(e, 'close')}>
        <Link href="/admin/companies" passHref>
          <a>Empresas</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="jobs" onClick={e => props.close(e, 'close')}>
        <Link href="/admin/jobs" passHref>
          <a>Plazas</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="applicants" onClick={e => props.close(e, 'close')}>
        <Link href="/admin/applicants" passHref>
          <a>Talentos</a>
        </Link>
      </Menu.Item>
    </Menu>
  );
};

CompanyNav.propTypes = {
  close: Proptypes.func,
};

CompanyNav.defaultProps = {
  close: () => {},
};

export default CompanyNav;
