import React from 'react';
import { Menu, Dropdown, Avatar, Button } from 'antd';
import Link from 'next/link';

const UserDropdown = props => {
  const menu = (
    <Menu className={` ${props.scope}`}>
      <Menu.Item className={`umana-dropdown--item-user ${props.scope}`}>
        <div className="umana-dpdw-card">
          {props.scope === 'talento' ? (
            <Avatar icon={<i className="material-icons">person</i>} size={50} />
          ) : null}
          <div>
            {props.user.name ? (
              <strong> {`${props.user.name}  ${props.user.lastname}`}</strong>
            ) : (
              'Perfil'
            )}
            <p>{`${props.user.email}`}</p>
          </div>
        </div>
        {props.scope === 'talento' ? (
          <Button size="small" type="orange">
            <Link href={`/admin/profile`} passHref>
              <a>Ver perfil</a>
            </Link>
          </Button>
        ) : null}
      </Menu.Item>

      <Menu.Item>
        <a onClick={props.logout}>Cerrar sesión</a>
      </Menu.Item>
    </Menu>
  );

  if (props.user) {
    return (
      <Dropdown overlay={menu} trigger={['click']} placement="bottomCenter">
        <div className={`ant-dropdown-link ${props.scope}`}>
          <span className="text-max">{props.user.name ? props.user.name : 'Ver Perfil'}</span>
          {props.scope === 'company' ? <i className="large material-icons">business</i> : null}
          {props.scope === 'talento' ? (
            <i className="large material-icons">account_circle</i>
          ) : null}
          {props.scope === 'umana' || props.scope === 'root' ? (
            <i className="large material-icons">verified_user</i>
          ) : null}
        </div>
      </Dropdown>
    );
  }
  return <a>Entrar</a>;
};

export default UserDropdown;
