import React from 'react';
import { Button, Avatar } from '../../components';
import Link from 'next/link';
import { RootNav, CompanyNav, TalentNav, PublicNav } from '../../menus';

import PropTypes from 'prop-types';
import './mobile.scss';

const MobileNav = props => {
  return (
    <>
      <div
        className={`umana-overlay menu-open-${props.open}`}
        onClick={e => props.setOpen(e, 'close')}
      ></div>

      <div className={`umana-mbNav menu-open-${props.open} ${props.scope}`}>
        <Button
          onClick={e => props.setOpen(e, 'close')}
          type="simple"
          style={{ background: 'transparent', color: 'white' }}
          className="umana-mbNav__close"
        >
          <i className="large material-icons">close</i>
        </Button>
        {props.isLogin && props.scope === 'talento' ? (
          <>
            <div className="umana-mbNav__profile">
              <Link
                href={`${
                  props.haveProfile && props.haveProfile.personal
                    ? '/crearperfil/' + props.user.id
                    : '/user/' + props.user.id
                }`}
                passHref
              >
                <a className="umana-mbNav__profile--link" onClick={e => props.setOpen(e, 'close')}>
                  {props.user && props.user.profile && props.user.profile.personal ? (
                    <Avatar
                      icon="user"
                      size="small"
                      src={`${props.user.profile.personal.avatar}`}
                    />
                  ) : (
                    <Avatar icon="user" size="small" />
                  )}
                  <div className="umana-mbNav__profile--content">
                    <h4>{props.user.name + ' ' + props.user.lastname}</h4>
                    <p>{props.user.email}</p>
                    <Button type="simple"> Ver Perfil</Button>
                  </div>
                </a>
              </Link>
            </div>
            <TalentNav direction="vertical" close={props.setOpen} user={props.user.id} />
          </>
        ) : null}
        {props.isLogin && props.scope === 'company' ? (
          <>
            <div className="umana-mbNav__profile">
              <div className="umana-mbNav__profile--content">
                <h4>{props.user.name + ' ' + props.user.lastname}</h4>
                <p>{props.user.email}</p>
              </div>
            </div>
            <CompanyNav direction="vertical" close={props.setOpen} />
          </>
        ) : null}
        {props.isLogin && props.scope === 'root' ? (
          <>
            <div className="umana-mbNav__profile">
              <div className="umana-mbNav__profile--content">
                <h4>{props.user.name + ' ' + props.user.lastname}</h4>
                <p>{props.user.email}</p>
              </div>
            </div>
            <RootNav direction="vertical" close={props.setOpen} />
          </>
        ) : null}
        {props.scope === 'guest' && !props.isLogin ? (
          <PublicNav close={props.setOpen} direction="vertical" />
        ) : null}

        {props.isLogin ? (
          <ul className="umana-mbNav__settings">
            <li>
              <a onClick={props.logout}>
                <i className="large material-icons">settings_power</i>Cerrar Sesión
              </a>
            </li>
          </ul>
        ) : null}
      </div>
    </>
  );
};

MobileNav.propTypes = {
  open: PropTypes.bool,
  isLogin: PropTypes.bool,
  setOpen: PropTypes.func,
  logout: PropTypes.func,
  user: PropTypes.object,
};

MobileNav.defaultProps = {
  open: false,
  isLogin: false,
  setOpen: () => {},
  logout: () => {},
  user: {},
};

export default MobileNav;
