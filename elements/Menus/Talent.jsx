import { useState } from 'react';
import { Menu } from 'antd';
import Link from 'next/link';
import Proptypes from 'prop-types';

const TalentNav = props => {
  const [current, setCurrent] = useState('/');

  const handleClick = e => {
    if (e.key === 'logout') {
      return;
    }
    /** Switch changes. */
    setCurrent(e.key);
    Router.push(`/${e.key === 'dashboard' ? '' : e.key}`);
  };

  return (
    <Menu
      mode={`${props.direction}`}
      id="header-nav"
      onClick={handleClick}
      selectedKeys={[current]}
      className={`header-nav umana-menu nav-desktop theme-${props.theme}`}
    >
      <Menu.Item key="dashboard" onClick={e => props.close(e, 'close')}>
        <Link href="/admin" passHref>
          <a>Dashboard</a>
        </Link>
      </Menu.Item>
      <Menu.Item key={`user/${props.user}`} onClick={e => props.close(e, 'close')}>
        <Link href="/user" passHref>
          <a>Mi perfil</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="plazas" onClick={e => props.close(e, 'close')}>
        <Link href="/plazas" passHref>
          <a>Plazas disponibles</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="misaplicaciones" onClick={e => props.close(e, 'close')}>
        <Link href="misaplicaciones" passHref>
          <a>Mis Aplicaciones</a>
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
