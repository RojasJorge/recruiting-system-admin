import { CheckOutlined, MehOutlined } from '@ant-design/icons';
import Actions from '../views/Actions';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { delay } from 'lodash';
import { Spin } from 'antd';

const AccountConfirm = query => {
  const [loading, switchLoading] = useState(true);
  const [result, updateResult] = useState(null);

  const confirmHash = _ =>
    axios
      .get(process.env.NEXT_PUBLIC_API_URL_PRODUCTION + '/verify/' + query.q)
      .then(resp => {
        updateResult(resp);

        delay(
          _ => {
            switchLoading(!loading);
          },
          1000,
          'done!',
        );
      })
      .catch(error => {
        if (error.response) {
          updateResult(error.response);
        } else if (error.request) {
          updateResult(error.request);
        } else {
          updateResult(error.message);
        }

        delay(
          _ => {
            switchLoading(!loading);
          },
          1000,
          'done!',
        );
      });

  const renderStatus = _ => {
    if (result && result.data && result.data.statusCode === 404) {
      return (
        <>
          <h1 style={{ color: 'red' }}>
            No encontrado <MehOutlined />
          </h1>
          <p>No se ha podido encontrar ese perfil ó la cuenta ya ha sido verificada.</p>
        </>
      );
    } else if (result && result.data && result.data.statusCode === 423) {
      return (
        <>
          <h1 style={{ color: 'orange' }}>
            Verificado <CheckOutlined />
          </h1>
          <p>Este perfil ya ha sido confirmado.</p>
        </>
      );
    } else if (result && result.status === 200) {
      return (
        <>
          <h1 style={{ color: 'green' }}>
            ¡Todo listo! <CheckOutlined />
          </h1>
          <h3>
            {result.data.name} &lt;{result.data.email}&gt;
          </h3>
          <p>
            Te haz dado de alta en nuestra plataforma, ahora puedes{' '}
            <Link href="/">
              <a>Iniciar Sesión</a>
            </Link>{' '}
            en UMANA
          </p>
        </>
      );
    }

    return <div></div>;
  };

  useEffect(() => {
    confirmHash();
  }, []);

  return (
    <Actions pageTitle="Confirmar cuenta">
      {loading ? (
        <div className="app--spinner animated fadeIn">
          <Spin tip="Cargando.." size="large" />
        </div>
      ) : (
        renderStatus()
      )}
    </Actions>
  );
};

/** Access to the router query and pass it to the primary instance */
AccountConfirm.getInitialProps = async ctx => ctx.query;

export default AccountConfirm;
