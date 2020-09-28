const Academic = props => {
  return (
    <div className="umana-content">
      <div className="umana-content__item item-lg">
        <h2>Nivel académico</h2>
      </div>

      <div className="umana-content__item item-lg item-loop">
        <div className="item-lg item-map">
          <h3>Liceo Ixchel</h3>
          <h4>Bachiller Industrial y Perito en Diseño Gráfico</h4>
          <label>Ciudad de Guatemala, 2013 - 2015</label>
        </div>
      </div>

      <div className="umana-content__item item-lg" style={{ marginTop: 40 }}>
        <hr />
        <h2>Otros cursos</h2>
      </div>

      <div className="umana-content__item item-lg item-loop">
        <div className="item-lg item-map">
          <h3>Udemic</h3>
          <h4>React Js</h4>
          <label>Ciudad de Guatemala, 2017</label>
        </div>
      </div>
    </div>
  );
};

export default Academic;
