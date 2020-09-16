import { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useRouter } from 'next/router';
import xhr from '../../xhr';
import { Avatar } from 'antd';
import { Sitebar } from '../../elements';

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

  const header = {
    title: data && data.company && data.company.name ? data.company.name : 'Empresa',
    icon: 'location_city',
    action: 'edit',
    titleAction: 'Editar perfil',
    urlAction: '/admin/companies/edit/',
    urlDinamic: router.query.id,
  };

  const menuList = [
    {
      icon: 'add_circle_outline',
      title: 'Agregar plaza',
      url: '/admin/jobs/add/',
      id: router.query.id,
    },
    {
      icon: 'remove_red_eye',
      title: 'Ver plazas',
      url: '/admin/jobs/',
      id: router.query.id,
    },
  ];

  return (
    <div className="umana-layout-cl">
      <div className="umana-layout-cl__small ">
        <Sitebar header={header} data={menuList} />
      </div>
      <div className="umana-layout-cl__flex bg-white">
        {data && data.company ? (
          <div className="umana-section-contenct">
            <div className="section-avatar">
              <Avatar icon={<i className="material-icons">location_city</i>} src={data.company.avatar} size={120} />
            </div>
            <div className="section-title">
              <h1>{data.company && data.company.name ? data.company.name : 'nombre de la empresa'}</h1>
            </div>
            <h5>Acerca de la empresa</h5>
            <p>{data.company && data.company.description ? data.company.description : 'Descripción de la empresa'}</p>
            {data.company.location ? (
              <>
                <h5>Ubicación</h5>
                <p>
                  {`${data.company.location.address}, zona ${data.company.location.zone},`}
                  <br></br> {`${data.company.location.city}, ${data.company.location.country}`}
                </p>
              </>
            ) : null}
            <h5>Sitio web</h5>
            <p>{data.company.website}</p>
            <h5>Fundación</h5>
            <p>{data.company.experience}</p>
            <h5>Números de empleados</h5>
            <p>{data.company.employees}</p>
            {/* <pre>{JSON.stringify(data.company, false, 2)}</pre> */}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Single;
