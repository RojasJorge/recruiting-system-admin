import { isEmpty } from 'lodash';
import locale from '../../../data/translates/spanish';
import { Can } from '../../Can';
import Link from 'next/link';
import { Checkbox } from 'antd';

const Economic = props => {
  // console.log('economic', props.data);
  return (
    <div className="umana-content" id="economic">
      <Can I="apply" a="JOBS">
        <Link href={`/admin/profile/edit?current=6`} passHref>
          <a className="umana-section-edit">
            <i className="material-icons">edit</i>
          </a>
        </Link>
      </Can>
      <div className="umana-content__item item-lg">
        <h2>Información Económica / Legal</h2>
      </div>
      {props.data.currentSalary ? (
        <div className="umana-content__item item-sm">
          <label>Sueldo actual</label>
          <h3>{`${props.data.currentSalaryCurrency ? props.data.currentSalaryCurrency : 'GTQ'}. ${props.data.currentSalary}.00`}</h3>
        </div>
      ) : null}
      {props.data.desiredSalary.baseMin || props.data.desiredSalary.baseMax ? (
        <div className="umana-content__item item-xmd">
          <label>Pretención Salarial</label>
          {props.data.desiredSalary.baseMin || props.data.desiredSalary.baseMax ? (
            <h3>{`${props.data.desiredSalary.currency}. ${props.data.desiredSalary.baseMin}.00 - ${props.data.desiredSalary.currency}. ${props.data.desiredSalary.baseMax}.00`}</h3>
          ) : null}
        </div>
      ) : null}
      {props.data.otherIncome ? (
        <>
          <div className="umana-content__item item-lg">
            <label>Tiene otros ingresos adicionales a su sueldo</label>
            <p>{locale(props.data.otherIncome)}</p>
          </div>
          {!isEmpty(props.data.incomes)
            ? props.data.incomes.map((e, idx) => (
                <>
                  <div className="umana-content__item item-sm">
                    <label>Monto</label>
                    <p>{locale(props.data.incomes)}</p>
                  </div>
                  <div className="umana-content__item item-xmd">
                    <label>Fuente de los ingresos adicionales</label>
                    <p>Freelances</p>
                  </div>
                </>
              ))
            : null}
        </>
      ) : null}
      <hr />
      {props.data.haveDebts ? (
        <div className="umana-content__item item-lg">
          <label>Tiene deudas</label>
          <p>Si</p>
        </div>
      ) : null}
      {!isEmpty(props.data.debts) ? (
        <div className="umana-content__item item-lg item-loop">
          {props.data.debts.map((e, idx) => (
            <div className="item-lg item-map item-group" key={`${idx}debts`}>
              <div className="item-group--i item-sm">
                <label>¿En dondé?</label>
                <p>{e.whatCompany}</p>
              </div>
              <div className="item-group--i item-sm">
                <label>Total de la deuda</label>
                <p>{`GTQ. ${e.amount}`}</p>
              </div>
              <div className="item-group--i item-sm">
                <label>¿Cuánto paga al mes?</label>
                <p>{`GTQ. ${e.monthlyFee}`}</p>
              </div>
              <hr />
            </div>
          ))}
        </div>
      ) : null}
      {props.data.typeHousing ? (
        <div className="umana-content__item item-sm">
          <label>Su vivienda es</label>
          <p>{locale(props.data.typeHousing)}</p>
        </div>
      ) : null}
      {props.data.dependents ? (
        <div className="umana-content__item item-xmd">
          <label>Dependientes</label>
          <p>{props.data.dependents}</p>
        </div>
      ) : null}
      {props.data.health.haveDisease ? (
        <>
          <hr />
          <div className="umana-content__item item-md">
            <label>Padece alguna enfermedad</label>
            <p>{locale(props.data.health.haveDisease)}</p>
            <label>¿Cuál?</label>
            <p>{props.data.health.disease}</p>
          </div>
        </>
      ) : null}
      {props.data.sindicate ? (
        <div className="umana-content__item item-md">
          <label>¿Cuál?</label>
          <p>{props.data.whatSindicate}</p>
        </div>
      ) : null}

      <div className="umana-content__item item-md">
        <label>Tiene tatuajes o pircings</label>
        <p>{locale(props.data.health.tattoOrPiercing)}</p>
        {props.data.health.tattoOrPiercing ? (
          <>
            <label>Especifique</label>
            <p>{props.data.health.whatTattoOrPiercing}</p>
          </>
        ) : null}
      </div>
      {!isEmpty(props.data.vehicles) ? (
        <>
          <hr />
          <div className="umana-content__item item-lg">
            <h3>Vehículos</h3>
          </div>
          <div className="umana-content__item item-lg item-loop">
            {props.data.vehicles.map((e, idx) => (
              <div className="item-lg item-map item-group" key={`${idx}vehicle`}>
                <div className="item-group--i item-fx">
                  <label>Tipo</label>
                  <p>{locale(e.type)}</p>
                </div>
                <div className="item-group--i item-fx">
                  <label>Marca y Linea</label>
                  <p>{e.brand}</p>
                </div>
                <div className="item-group--i item-fx">
                  <label>Modelo</label>
                  <p>{e.year}</p>
                </div>
                <div className="item-group--i item-fx">
                  <label>Debe</label>
                  <p>{locale(e.debts)}</p>
                </div>
                <div className="item-group--i item-fx">
                  <label>Monto</label>
                  <p>{`GTQ. ${e.amount}`}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : null}
      <hr />
      <div className="umana-content__item item-lg">
        <h3>Legal</h3>
      </div>
      <div className="umana-content__item item-lg">
        <label>¿Ha tenido alguna demanda, juicio o problema legal?</label>
        <p>{locale(props.data.legal.legalProblem)}</p>
        {props.data.legal.legalProblem ? (
          <>
            <label>¿Cuál?</label>
            <p>{props.data.legal.whatProblem}</p>
          </>
        ) : null}
      </div>
      <div className="umana-content__item item-lg">
        <label>¿Ha tenido alguna demanda, juicio o problema legal?</label>
        <p>{locale(props.data.legal.legalProblem)}</p>
        {props.data.legal.legalProblem ? (
          <>
            <label>¿Cuál?</label>
            <p>{props.data.legal.whatProblem}</p>
          </>
        ) : null}
      </div>
      {props.data && props.data.legal && props.data.legal.sindicate ? (
        <>
          <div className="umana-content__item item-md">
            <label>¿Ha pertenecido a algún sindicato?</label>
            <p>{locale(props.data.legal.sindicate)}</p>
          </div>
          <div className="umana-content__item item-fx">
            <label>¿Cúal?</label>
            <p>{locale(props.data.legal.whatsindicate)}</p>
          </div>
        </>
      ) : null}
      <div className="umana-content__item item-lg">
        <label>Autorizo a Umana a solicitar información personal por Infonet</label>
        <p>{locale(props.data.legal.infonetOrOther)}</p>
      </div>
      <div className="umana-content__item item-lg">
        <Checkbox checked={props.data.allowed} disabled>
          Autorizo expresamente a las empresas que distribuyen o comercializan con datos personales, para que distribuyan / comercialicen estudios que contengan datos personales concernientes a mi
          persona, a efecto de verificar la información proporcionada; y autorizo que mis datos personales sean compartidos / distribuidos a empresas que presten servicios de información personal:
          según los artículos 9 numeral 1 y 64 Ley de Acceso a la Información Pública, 19, 21, 22, 28, 46. Ley contra Lavado de Dinero y Otros Activos y 12 y 20 de su Reglamento: 50, 55, 56 y 58. Ley
          de Bancos y Grupos Financieros entre otros. Doy fe que la información proporcionada es verdadera y queda a disposición de ser verificada por UMANA RH.
        </Checkbox>
      </div>
    </div>
  );
};

export default Economic;
