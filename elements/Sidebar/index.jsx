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

  const onChange = () => {
    setTimeout(() => {
      window.scroll({
        top: 80,
        behavior: 'smooth',
      });
    }, 500);
  };

  return (
    <div className={`umana-sitebar theme-${props.theme ? props.theme : 'blue'}`}>
      {!isEmpty(props.header) ? (
        <div className="umana-sitebar__header">
          {props.header.icon ? (
            <div className="header-icon">
              <i className="material-icons">{props.header.icon}</i>
            </div>
          ) : null}
          <div className="header-content">
            <h4>{props.header.title}</h4>
            {props.header.subtitle ? <p>{props.header.subtitle}</p> : null}
            {props.header.urlDinamic ? (
              props.header.urlAction ? (
                <Link href={`${props.header.urlAction}${props.header.urlParam ? props.header.urlParam : '[id]'}`} as={`${props.header.urlAction}${props.header.urlDinamic}`}>
                  <a>
                    {props.header.titleAction} <i className="material-icons">{props.header.action}</i>
                  </a>
                </Link>
              ) : (
                <a>
                  {props.header.titleAction} <i className="material-icons">{props.header.action}</i>
                </a>
              )
            ) : props.header.urlAction === 'back' ? (
              <Button onClick={() => onBack()} type="link">
                {props.header.titleAction} <i className="material-icons">{props.header.action}</i>
              </Button>
            ) : props.header.urlAction ? (
              <Link href={props.header.urlAction} passHref>
                <a>
                  {props.header.titleAction} <i className="material-icons">{props.header.action}</i>
                </a>
              </Link>
            ) : (
              <a>
                {props.header.titleAction} <i className="material-icons">{props.header.action}</i>
              </a>
            )}
          </div>
        </div>
      ) : null}
      {!isEmpty(props.data) ? (
        <Menu mode="inline" theme="light" inlineCollapsed={collapsed} className={`theme-${props.theme ? props.theme : 'blue'}`} onClick={onChange}>
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
      ) : null}
      <div className="umana-sitebar-childrens">{props.children}</div>
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
