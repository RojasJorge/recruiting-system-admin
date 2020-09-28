import { Avatar } from 'antd';
const General = props => {
  return (
    <div className="umana-content" style={{ marginTop: 50 }} id="general">
      <div className="umana-content-title-over">
        <Avatar icon={<i className="material-icons">person</i>} src={null} size={130} />
        <h2>Andrea España Siliezar</h2>
      </div>
      <div className="umana-content__item item-lg" style={{ textAlign: 'center' }}>
        <label>Puestos a los que aplica</label>
        <p>Desarrollador web, Programadora</p>
      </div>
      <div className="umana-content__item item-lg" style={{ textAlign: 'center' }}>
        <label>Ubicación Actual</label>
        <p>Ciudad de Guatemala, Guatemala</p>
      </div>

      <div className="umana-content__item item-lg">
        <hr />
        <h3>Información General</h3>
      </div>
      <div className="umana-content__item item-sm">
        <label>Nacionalidad</label>
        <p>Guatemalteco(a)</p>
      </div>
      <div className="umana-content__item item-sm">
        <label>Fecha de nacimiento</label>
        <p>01 agosto 1996</p>
      </div>
      <div className="umana-content__item item-sm">
        <label>Edad</label>
        <p>24 años</p>
      </div>
      <div className="umana-content__item item-sm">
        <label>Sexo</label>
        <p>Femenino</p>
      </div>
      <div className="umana-content__item item-sm">
        <label>Religión</label>
        <p>Sin religión</p>
      </div>
      <div className="umana-content__item item-sm">
        <label>Estado civil</label>
        <p>Soltero(a)</p>
      </div>
    </div>
  );
};

export default General;
