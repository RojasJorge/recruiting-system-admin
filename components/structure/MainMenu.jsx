import { useState, useEffect } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Link from 'next/link';
import { Menu, Modal } from 'antd';
import {
  LogoutOutlined,
  UsergroupAddOutlined,
  HomeOutlined,
  DownOutlined,
  UserOutlined,
  OrderedListOutlined,
  DashOutlined,
} from '@ant-design/icons';
import Router from 'next/router';
import UmanaLogo from '../Misc/UmanaLogo';
import UmanaMenu from './rootMenu';
import UserMenu from './talentoMenu';

const MainMenu = _ => {
  const isMain = /\/[a-z]/i;
  const [current, setCurrent] = useState('/');

  const user = useStoreState(state => state.auth.user);
  const token = useStoreState(state => state.auth.token);

  const handleClick = e => {
    if (e.key === 'logout') {
      return;
    }

    /** Switch changes. */
    setCurrent(e.key);
    Router.push(`/${e.key === 'dashboard' ? '' : e.key}`);
  };

  useEffect(() => {
    setCurrent(!Router.pathname.match(isMain) ? 'dashboard' : Router.pathname.replace('/', ''));
  }, []);

  return user ? (
    <>
      <div className={`menu--user ${user.scopes[1] === 'talento' ? 'menu-orange' : null}`}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col">
              <UmanaLogo />
            </div>
            {user.scopes[0] === 'umana' ? <UmanaMenu user={user} /> : null}
            {user.scopes[1] === 'talento' ? <UserMenu user={user} /> : null}
          </div>
        </div>
      </div>
      {/*App menu*/}
    </>
  ) : (
    <div className="menu--user menu--user__login umana__header--noLogin">
      <div className="container">
        <div className="row align-items-center">
          <div className="col">
            <UmanaLogo />
          </div>
          <div className="col access-links  umana-menu">
            <Link href="/" passHref>
              <a>Talentos</a>
            </Link>
            <Link href="/" passHref>
              <a>Empresas</a>
            </Link>
            {current === 'login' ? (
              <>
                <Link href="/" passHref>
                  <a>Inicio</a>
                </Link>
              </>
            ) : (
              <Link href="/login" passHref>
                <a>Entrar</a>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
