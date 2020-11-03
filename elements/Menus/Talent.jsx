import { useState } from 'react';
import { Menu } from 'antd';
import Link from 'next/link';
import Proptypes from 'prop-types';
import router from 'next/router';

const TalentNav = props => {
  const [current, setCurrent] = useState('/');

  return (
    <Menu mode={`${props.direction}`} id="header-nav" selectedKeys={[current]} className={`header-nav umana-menu nav-desktop theme-${props.theme}`}>
      <Menu.Item key="requests" onClick={e => props.close(e, 'close')}>
        <Link href="/admin/requests" passHref>
          <a>Mis solicitudes</a>
        </Link>
      </Menu.Item>
      {/*<Menu.Item key="dashboard" onClick={e => props.close(e, 'close')}>*/}
      {/*  <Link href="/admin" passHref>*/}
      {/*    <a>Dashboard</a>*/}
      {/*  </Link>*/}
      {/*</Menu.Item>*/}
      <Menu.Item key={`profile`} onClick={e => props.close(e, 'close')}>
        <Link href="/admin/profile" passHref>
          <a>Mi perfil</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="jobs" onClick={e => props.close(e, 'close')}>
        <Link href="/admin/jobs" passHref>
          <a>Plazas disponibles</a>
        </Link>
      </Menu.Item>
    </Menu>
  );
};

TalentNav.propTypes = {
  close: Proptypes.func,
};

TalentNav.defaultProps = {
  close: () => {},
};

export default TalentNav;
