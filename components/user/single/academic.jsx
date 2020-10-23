import { isEmpty } from 'lodash';
import Moment from 'react-moment';
import { Can } from '../../Can';
import Link from 'next/link';

const Academic = props => {
  return (
    <>
      {!isEmpty(props.data.studies) ? (
        <div className="umana-content" id="academiclevel">
          <Can I="apply" a="JOBS">
            <Link href={`/admin/profile/edit?current=4`} passHref>
              <a className="umana-section-edit">
                <i className="material-icons">edit</i>
              </a>
            </Link>
          </Can>

          <div className="umana-content__item item-lg">
            <h2>Nivel académico</h2>
          </div>
          <div className="umana-content__item item-lg item-loop">
            {props.data.studies.map((e, idx) => (
              <div className="item-lg item-map" key={`${idx}studie`}>
                <h3>{e.establishment}</h3>
                <h4>{e.academicLevel}</h4>
                <label>
                  <Moment locale="es" format="DD MMMM YYYY">
                    {e.dateInit}
                  </Moment>
                  , {e.currently ? 'presente' : <Moment format="D MMM YYYY">{e.dateEnd}</Moment>}
                </label>
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {!isEmpty(props.data.courses) ? (
        <div className="umana-content" id="courses">
          <Can I="apply" a="JOBS">
            <Link href={`/admin/profile/edit?current=5`} passHref>
              <a className="umana-section-edit">
                <i className="material-icons">edit</i>
              </a>
            </Link>
          </Can>

          <div className="umana-content__item item-lg">
            <h2>Otros cursos</h2>
          </div>

          <div className="umana-content__item item-lg item-loop">
            {props.data.courses.map((e, idx) => (
              <div className="item-lg item-map" key={`${idx}course`}>
                <h3>{e.establishment}</h3>
                <h4>{e.titleCourse}</h4>
                <label>
                  {`${e.country}, `}{' '}
                  <Moment locale="es" format="YYYY">
                    {e.year}
                  </Moment>
                </label>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Academic;
