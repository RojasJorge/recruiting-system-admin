import { useState, useEffect } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Link from 'next/link';
import { RootNav, CompanyNav, TalentNav, PublicNav, UserDropdown } from '../../elements';

import Router from 'next/router';
import UmanaLogo from '../Misc/UmanaLogo';
import UmanaMenu from './rootMenu';
import UserMenu from './talentoMenu';

const MainMenu = _ => {
  const isMain = /\/[a-z]/i;
  const [current, setCurrent] = useState('/');

  const user = useStoreState(state => state.auth.user);
  const token = useStoreState(state => state.auth.token);
  const signOut = useStoreActions(actions => actions.auth.logout);

  const handleClick = e => {
    if (e.key === 'logout') {
      return;
    }

    /** Switch changes. */
    setCurrent(e.key);
    Router.push(`/${e.key === 'dashboard' ? '' : e.key}`);
  };

  useEffect(() => {
    // console.log('MainMenu.jsx|user', user, token)
    setCurrent(!Router.pathname.match(isMain) ? 'dashboard' : Router.pathname.replace('/', ''));
  }, []);

  return user ? (
    <>
      <div className="umana-header">
        <UmanaLogo />
        <div className="umana-main-nav">
          {user.scope[0] === 'umana' ? (
            <>
              <RootNav user={user} direction="horizontal" theme="root" />
              <UserDropdown user={user} scope="root" logout={signOut} />
            </>
          ) : null}
          {user.scope[0] === 'company' ? (
            <>
              <CompanyNav user={user} direction="horizontal" theme="company" />
              <UserDropdown user={user} scope="company" logout={signOut} />
            </>
          ) : null}
          {user.scope[0] === 'candidate' ? (
            <>
              <TalentNav user={user} direction="horizontal" theme="talento" />
              <UserDropdown user={user} scope="talento" logout={signOut} />
            </>
          ) : null}
        </div>
      </div>
    </>
  ) : (
    <div className="umana-header">
      <UmanaLogo />
      <div className="umana-main-nav">
        <PublicNav direction="horizontal" theme="root" />
      </div>
    </div>
  );
};

export default MainMenu;
