const Economic = props => {
  return (
    <div className="umana-content" id="economic">
      <div className="umana-content__item item-lg">
        <h2>Información Económica / Legal</h2>
      </div>
      <div className="umana-content__item item-sm">
        <label>Sueldo actual</label>
        <h3>Q.8,000.00</h3>
      </div>
      <div className="umana-content__item item-xmd">
        <label>Pretención Salarial</label>
        <h3>Q.8,000.00 - Q. 12,000.00</h3>
      </div>
      <div className="umana-content__item item-xmd">
        <label>Tiene otros ingresos adicionales a su sueldo</label>
        <p>Si</p>
      </div>
      <div className="umana-content__item item-sm">
        <label>Monto</label>
        <p>Q.8,000.00</p>
      </div>
      <div className="umana-content__item item-lg">
        <label>Fuente de los ingresos adicionales</label>
        <p>Freelances</p>
      </div>
      <hr />
      <div className="umana-content__item item-lg">
        <label>Tiene deudas</label>
        <p>Si</p>
      </div>
      <div className="umana-content__item item-sm">
        <label>¿En dondé?</label>
        <p>Banco Industrial</p>
      </div>
      <div className="umana-content__item item-sm">
        <label>Total de la deuda</label>
        <p>Q.4,000.00</p>
      </div>
      <div className="umana-content__item item-sm">
        <label>¿Cuánto paga al mes?</label>
        <p>Q.400.00</p>
      </div>
      <hr />
      <div className="umana-content__item item-sm">
        <label>Su vivienda es</label>
        <p>Propia</p>
      </div>
      <div className="umana-content__item item-xmd">
        <label>Dependientes</label>
        <p>0</p>
      </div>
      <hr />
      <div className="umana-content__item item-md">
        <label>Padece alguna enfermedad</label>
        <p>Si</p>
        <label>¿Cuál?</label>
        <p>Alergias</p>
      </div>
      <div className="umana-content__item item-md">
        <label>Tiene tatuajes o pircings</label>
        <p>Si</p>
      </div>
      <hr />
      <div className="umana-content__item item-lg">
        <h3>Vehículos</h3>
      </div>
      <div className="umana-content__item item-lg item-loop">
        <div className="item-lg item-map item-group">
          <div className="item-group--i item-fx">
            <label>Tipo</label>
            <p>Camioneta</p>
          </div>
          <div className="item-group--i item-fx">
            <label>Marca y Linea</label>
            <p>Mazda 3</p>
          </div>
          <div className="item-group--i item-fx">
            <label>Modelo</label>
            <p>2007</p>
          </div>
          <div className="item-group--i item-fx">
            <label>Debe</label>
            <p>Si</p>
          </div>
          <div className="item-group--i item-fx">
            <label>Monto</label>
            <p>Q. 10,000.00</p>
          </div>
        </div>
      </div>
      <hr />
      <div className="umana-content__item item-lg">
        <h3>Legal</h3>
      </div>
      <div className="umana-content__item item-lg">
        <label>¿Ha tenido alguna demanda, juicio o problema legal?</label>
        <p>Si</p>
        <label>¿Cuál?</label>
        <p>Lorem Ipsum</p>
      </div>
      <div className="umana-content__item item-lg">
        <label>¿Tiene Anotación en Infonet o similar?</label>
        <p>No</p>
      </div>
      <hr />
      <div className="umana-content__item item-lg">
        <input type="checkbox" checked disabled />
        <p>
          Autorizo expresamente a las empresas que distribuyen o comercializan con datos personales, para que distribuyan / comercialicen estudios que contengan datos personales concernientes a mi
          persona, a efecto de verificar la información proporcionada; y autorizo que mis datos personales sean compartidos / distribuidos a empresas que presten servicios de información personal:
          según los artículos 9 numeral 1 y 64 Ley de Acceso a la Información Pública, 19, 21, 22, 28, 46. Ley contra Lavado de Dinero y Otros Activos y 12 y 20 de su Reglamento: 50, 55, 56 y 58. Ley
          de Bancos y Grupos Financieros entre otros. Doy fe que la información proporcionada es verdadera y queda a disposición de ser verificada por UMANA RH.
        </p>
      </div>
    </div>
  );
};

export default Economic;
