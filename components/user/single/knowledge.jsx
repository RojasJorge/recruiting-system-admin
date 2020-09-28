import { Progress, Tag } from 'antd';
const Knowledge = props => {
  return (
    <div className="umana-content">
      <div className="umana-content__item item-lg">
        <h2>Otros conocimientos</h2>
      </div>

      <div className="umana-content__item item-lg">
        <h3>Idiomas</h3>
      </div>
      <div className="umana-content__item item-lg item-loop">
        <div className="item-lg item-map item-group">
          <label>Español</label>
          <div className="item-group--i item-sm" style={{ textAlign: 'center' }}>
            <Progress width={150} strokeWidth={2} strokeColor="#585858" type="circle" percent={100} format={percent => `Comprensión ${percent}%`} />
          </div>
          <div className="item-group--i item-sm" style={{ textAlign: 'center' }}>
            <Progress width={150} strokeWidth={2} strokeColor="#585858" type="circle" percent={80} format={percent => `Lectura ${percent}%`} />
          </div>
          <div className="item-group--i item-sm" style={{ textAlign: 'center' }}>
            <Progress width={150} strokeWidth={2} strokeColor="#585858" type="circle" percent={90} format={percent => `Habla ${percent}%`} />
          </div>
        </div>
      </div>

      <div className="umana-content__item item-lg">
        <hr />
        <h3>Habilidades</h3>
      </div>
      <div className="umana-content__item item-lg">
        <Tag>Html</Tag> <Tag>CSS</Tag>
      </div>

      <div className="umana-content__item item-lg">
        <hr />
        <h3>Softwares</h3>
      </div>
      <div className="umana-content__item item-lg">
        <Tag>Html</Tag> <Tag>CSS</Tag>
      </div>
    </div>
  );
};

export default Knowledge;
