import { Progress, Tag } from 'antd';
import { isEmpty } from 'lodash';
import { Can } from '../../Can';
import Link from 'next/link';
const Knowledge = props => {
  return (
    <div className="umana-content">
      <Can I="apply" a="JOBS">
        <Link href={`/admin/profile/edit?current=6`} passHref>
          <a className="umana-section-edit">
            <i className="material-icons">edit</i>
          </a>
        </Link>
      </Can>
      <div className="umana-content__item item-lg">
        <h2>Otros conocimientos</h2>
      </div>
      {!isEmpty(props.data.languages) ? (
        <>
          <div className="umana-content__item item-lg">
            <h3>Idiomas</h3>
          </div>
          <div className="umana-content__item item-lg item-loop">
            {props.data.languages.map((e, idx) => (
              <div className="item-lg item-map item-group" key={`${idx}languages`}>
                <label>{e.language}</label>
                <div className="item-group--i item-sm" style={{ textAlign: 'center' }}>
                  <Progress
                    width={150}
                    strokeWidth={2}
                    strokeColor="#585858"
                    type="circle"
                    percent={e.comprehension}
                    format={percent => `Comprensión ${percent}%`}
                  />
                </div>
                <div className="item-group--i item-sm" style={{ textAlign: 'center' }}>
                  <Progress
                    width={150}
                    strokeWidth={2}
                    strokeColor="#585858"
                    type="circle"
                    percent={e.write}
                    format={percent => `Lectura ${percent}%`}
                  />
                </div>
                <div className="item-group--i item-sm" style={{ textAlign: 'center' }}>
                  <Progress
                    width={150}
                    strokeWidth={2}
                    strokeColor="#585858"
                    type="circle"
                    percent={e.speak}
                    format={percent => `Habla ${percent}%`}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      ) : null}
      {!isEmpty(props.data.skills) ? (
        <>
          <div className="umana-content__item item-lg">
            <hr />
            <h3>Habilidades</h3>
          </div>
          <div className="umana-content__item item-lg">
            {props.data.skills.map((e, idx) => (
              <Tag key={`${idx}skill`}>{e}</Tag>
            ))}
          </div>
        </>
      ) : null}
      {!isEmpty(props.data.softwares) ? (
        <>
          <div className="umana-content__item item-lg">
            <hr />
            <h3>Softwares</h3>
          </div>
          <div className="umana-content__item item-lg">
            {props.data.softwares.map((e, idx) => (
              <Tag key={`${idx}software`}>{e}</Tag>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Knowledge;
