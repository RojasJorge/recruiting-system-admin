import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'antd';
import Proptypes from 'prop-types';

const RootNav = props => {
  const [current, setCurrent] = useState('/');

  const handleClick = e => {
    if (e.key === 'logout') {
      return;
    }
    /** Switch changes. */
    setCurrent(e.key);
    // Router.push(`/${e.key === 'dashboard' ? '' : e.key}`);
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
      <Menu.Item key="candidatos" onClick={e => props.close(e, 'close')}>
        <Link href="/candidatos" passHref>
          <a>Candidatos</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="empresas" onClick={e => props.close(e, 'close')}>
        <Link href="/empresas" passHref>
          <a>Empresas</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="plazas" onClick={e => props.close(e, 'close')}>
        <Link href="/plazas" passHref>
          <a>Plazas</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="catalogos" onClick={e => props.close(e, 'close')}>
        <Link href="/catalogos" passHref>
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
