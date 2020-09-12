import { Menu, Button } from 'antd';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { isEmpty } from 'lodash';

const Sitebar = props => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    if (collapsed) {
      setCollapsed(false);
    } else {
      setCollapsed(true);
    }
  };
  return (
    <div className="umana-sitebar">
      {/* <Button type="link" size="large" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
        <i classNae="material-icons">chevron_left</i>
      </Button> */}
      {!isEmpty(props.header) ? (
        <div className="umana-sitebar__header">
          <div className="header-icon">
            <i className="material-icons">{props.header.icon}</i>
          </div>
          <div className="header-content">
            <h4>{props.header.title}</h4>
            <Link href={props.header.urlAction} passHref>
              <a>
                {props.header.titleAction} <i className="material-icons">{props.header.action}</i>
              </a>
            </Link>
          </div>
        </div>
      ) : null}

      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
      >
        {props.data
          ? props.data.map((e, idx) => (
              <Menu.Item key={idx} icon={<i className="material-icons">{e.icon}</i>}>
                <Link href={e.url} passHref>
                  <a>{e.title}</a>
                </Link>
              </Menu.Item>
            ))
          : null}
      </Menu>
    </div>
  );
};

Sitebar.propTypes = {
  header: PropTypes.object,
  data: PropTypes.array,
};

Sitebar.defaultProps = {
  header: {},
  data: [],
};

export default Sitebar;
