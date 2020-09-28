import { Menu, Button } from 'antd';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { isEmpty } from 'lodash';

const Sitebar = props => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    if (collapsed) {
      setCollapsed(false);
    } else {
      setCollapsed(true);
    }
  };

  const onBack = () => {
    router.back();
  };

  return (
    <div className={`umana-sitebar theme-${props.theme ? props.theme : 'blue'}`}>
      {!isEmpty(props.header) ? (
        <div className="umana-sitebar__header">
          <div className="header-icon">
            <i className="material-icons">{props.header.icon}</i>
          </div>
          <div className="header-content">
            <h4>{props.header.title}</h4>
            {props.header.urlDinamic ? (
              <Link href={`${props.header.urlAction}${props.header.urlParam ? props.header.urlParam : '[id]'}`} as={`${props.header.urlAction}${props.header.urlDinamic}`}>
                <a>
                  {props.header.titleAction} <i className="material-icons">{props.header.action}</i>
                </a>
              </Link>
            ) : props.header.urlAction === 'back' ? (
              <Button onClick={() => onBack()} type="link">
                {props.header.titleAction} <i className="material-icons">{props.header.action}</i>
              </Button>
            ) : (
              <Link href={props.header.urlAction} passHref>
                <a>
                  {props.header.titleAction} <i className="material-icons">{props.header.action}</i>
                </a>
              </Link>
            )}
          </div>
        </div>
      ) : null}

      <Menu mode="inline" theme="light" inlineCollapsed={collapsed}>
        {!isEmpty(props.data)
          ? props.data.map((e, idx) => (
              <Menu.Item key={idx} icon={<i className="material-icons">{e.icon}</i>}>
                {e.id ? (
                  <Link href={`${e.url}[id]`} as={`${e.url}${e.id}`}>
                    <a>{e.title}</a>
                  </Link>
                ) : (
                  <Link href={e.url} passHref>
                    <a>{e.title}</a>
                  </Link>
                )}
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
