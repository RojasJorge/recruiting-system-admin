import { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useRouter } from 'next/router';
import { Sitebar } from '../../elements';
import xhr from '../../xhr';
import { Alert } from 'antd';

const Single = _ => {
  const [missing, isMissing] = useState(false);
  const router = useRouter();
  const data = useStoreState(state => state.companies);
  const fill = useStoreActions(actions => actions.companies.fill);

  useEffect(() => {
    xhr()
      .get(`/company/${router.query.id}`)
      .then(res => {
        res.type = false; /** This param (if true) loads a collection, false => single object */
        fill(res);
      })
      .catch(err => isMissing(true));
  }, []);
  return (
    // <>
    //   {
    //     missing
    //       ? <Alert type="warning" message="No encontrado." description="La entidad solicitada no existe en la base de datos." showIcon />
    //       : null
    //   }
    //   <pre>{JSON.stringify(data.company, false, 2)}</pre>
    // </>
    <div className="umana-layout-cl">
      <div className="umana-layout-cl__small ">
        <Sitebar />
      </div>
      <div className="umana-layout-cl__flex bg-white">
        <div className="section-title">
          <h1>{data.company && data.company.name ? data.company.name : 'nombre de la empresa'}</h1>
        </div>
        <h5>Acerca de la empresa</h5>
        <p>
          {data.company && data.company.description
            ? data.company.description
            : 'Descripción de la empresa'}
        </p>
        <pre>{JSON.stringify(data.company, false, 2)}</pre>
      </div>
    </div>
  );
};

export default Single;
