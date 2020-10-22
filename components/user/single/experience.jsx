import { isEmpty } from 'lodash';
import Moment from 'react-moment';
import locale from '../../../data/translates/spanish';
import { Can } from '../../Can';
import Link from 'next/link';

const Experience = props => {
  if (!isEmpty(props.data.experiences)) {
    return (
      <div className="umana-content" id="experience">
        <Can I="apply" a="JOBS">
          <Link href={`/admin/profile/edit?current=7`} passHref>
            <a className="umana-section-edit">
              <i className="material-icons">edit</i>
            </a>
          </Link>
        </Can>

        <div className="umana-content__item item-lg">
          <h2>Experiencia Laboral</h2>
        </div>

        <div className="umana-content__item item-lg item-loop">
          {props.data.experiences.map((e, idx) => (
            <div className="item-lg item-map" key={`${idx}experience`}>
              <h3>{e.jobTitle}</h3>
              <h4>{e.company}</h4>
              {/* <label>Ciudad de Guatemala; Marzo 14, 2016 - Presente - 4 años</label> */}
              <label>
                {`${e.specializationCompany} - `}{' '}
                <Moment locale="es" format="D MMM YYYY">
                  {e.dateInit}
                </Moment>{' '}
                -{' '}
                {e.workingNow ? (
                  'Presente'
                ) : (
                  <Moment locale="es" format="D MMM YYYY">
                    {e.dateEnd}
                  </Moment>
                )}
              </label>
              <p></p>
            </div>
          ))}
        </div>

        <div className="umana-content__item item-md">
          <label>¿Ha pertenecido a algún sindicato?</label>
          <p>{locale(props.data.sindicate)}</p>
        </div>
        {props.data.sindicate ? (
          <div className="umana-content__item item-md">
            <label>¿Cuál?</label>
            <p>{props.data.whatSindicate}</p>
          </div>
        ) : null}
      </div>
    );
  }
  return null;
};

export default Experience;
