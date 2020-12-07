import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'antd';
import Proptypes from 'prop-types';
import { useRouter } from 'next/router';

const PublicNav = props => {
  const router = useRouter();
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
    <Menu mode={`${props.direction}`} id="header-nav" onClick={handleClick} selectedKeys={[current]} className={`header-nav umana-menu nav-desktop`}>
      <Menu.Item key="umana.co" onClick={e => props.close(e, 'close')}>
        <a href="https://umana.co">Inicio</a>
      </Menu.Item>
      <Menu.Item key="jobs" onClick={e => props.close(e, 'close')}>
        <Link href="/jobs" passHref>
          <a>Encuentra trabajo</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="empresas" onClick={e => props.close(e, 'close')}>
        <a href="https://umana.co/empresas">Empresas</a>
      </Menu.Item>

      <Menu.Item key="login" onClick={e => props.close(e, 'close')}>
        <Link href="/" passHref>
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
