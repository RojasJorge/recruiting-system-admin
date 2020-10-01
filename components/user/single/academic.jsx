import { isEmpty } from 'lodash';
import Moment from 'react-moment';

const Academic = props => {
  return (
    <div className="umana-content" id="academiclevel">
      {!isEmpty(props.data.studies) ? (
        <>
          <div className="umana-content__item item-lg">
            <h2>Nivel académico</h2>
          </div>
          <div className="umana-content__item item-lg item-loop">
            {props.data.studies.map((e, idx) => (
              <div className="item-lg item-map" key={`${idx}studie`}>
                <h3>{e.establishment}</h3>
                <h4>{e.academicLevel}</h4>
                <label>
                  <Moment format="D MMM YYYY">{e.dateInit}</Moment>, {e.currently ? 'presente' : <Moment format="D MMM YYYY">{e.dateEnd}</Moment>}
                </label>
              </div>
            ))}
          </div>
        </>
      ) : null}
      {!isEmpty(props.data.courses) ? (
        <>
          <div className="umana-content__item item-lg" style={{ marginTop: 40 }}>
            <hr />
            <h2>Otros cursos</h2>
          </div>

          <div className="umana-content__item item-lg item-loop">
            {props.data.courses.map((e, idx) => (
              <div className="item-lg item-map" key={`${idx}course`}>
                <h3>{e.establishment}</h3>
                <h4>{e.titleCourse}</h4>
                <label>
                  {`${e.country}, `} <Moment format="YYYY">{e.year}</Moment>
                </label>
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Academic;
