import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'antd';
import Proptypes from 'prop-types';

const PublicNav = props => {
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
      className={`header-nav umana-menu nav-desktop`}
    >
      <Menu.Item key="dashboard" onClick={e => props.close(e, 'close')}>
        <Link href="/" passHref>
          <a>Inicio</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="conoce-mas/talentos" onClick={e => props.close(e, 'close')}>
        <Link href="/conoce-mas/talentos" passHref>
          <a>talentos</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="conoce-mas/empresas" onClick={e => props.close(e, 'close')}>
        <Link href="/conoce-mas/empresas" passHref>
          <a>Empresas</a>
        </Link>
      </Menu.Item>

      <Menu.Item key="login" onClick={e => props.close(e, 'close')}>
        <Link href="/login" passHref>
          <a>Iniciar Sesión</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="registro/null" className="type-btn" onClick={e => props.close(e, 'close')}>
        <Link href="/signup" passHref>
          <a>Registrarse</a>
        </Link>
      </Menu.Item>
    </Menu>
  );
};
PublicNav.propTypes = {
  close: Proptypes.func,
};

PublicNav.defaultProps = {
  close: () => {},
};

export default PublicNav;
