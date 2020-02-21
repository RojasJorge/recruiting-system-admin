import { useState } from "react";
import { useForm } from "react-hook-form";
import { Icon } from "antd";
import { useStoreState } from "easy-peasy";
import { find } from "lodash";

const Form = ({ update }) => {
  const { handleSubmit, register, errors } = useForm();
  const [personal, setPersonal] = useState({ name: "" });

  /** Get countries */
  const countries = useStoreState(state => state.tools.countries);

  const [country, selectCountry] = useState({
    data: []
  });

  const countryHandler = e => {
    selectCountry(find(countries, o => o.code === e.target.value));
    console.log("code...", country);
  };

  const onSubmit = values => {
    console.log("Values:", values);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="name">Nombre:</label>
            <input
              name="name"
              type="text"
              value={personal.name}
              onChange={e => setPersonal({ ...personal, name: e.target.value })}
              ref={register({
                required: true
              })}
            />
            <div className="errors">
              {errors.name && (
                <p>
                  <Icon type="warning" /> Nombre es requerido.
                </p>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="name">Apellido:</label>
            <input
              name="lastname"
              type="text"
              ref={register({
                required: true
              })}
            />
            <div className="errors">
              {errors.lastname && (
                <p>
                  <Icon type="warning" /> Apellido es requerido.
                </p>
              )}
            </div>
          </div>
          <div className="col-md-12">
            <label htmlFor="name">Puesto Actual:</label>
            <input
              name="jobTitle"
              type="text"
              ref={register({
                required: true
              })}
            />
            <div className="errors">
              {errors.jobTitle && (
                <p>
                  <Icon type="warning" /> Puesto actual es requerido.
                </p>
              )}
            </div>
          </div>
          <h3>Ubicación actual</h3>
          <div className="col">
            <label htmlFor="name">País:</label>
            <select
              name="country"
              placeholder="Seleccione"
              style={{ width: 200 }}
              ref={register({
                required: true
              })}
              onChange={countryHandler}
            >
              <option value="">Seleccione</option>
              {countries.length > 0
                ? countries.map(o => (
                    <option key={o.code} value={o.code}>
                      {o.name}
                    </option>
                  ))
                : null}
            </select>
            <div className="errors">
              {errors.country && (
                <p>
                  <Icon type="warning" /> País es requerido.
                </p>
              )}
            </div>
          </div>
          <div className="col">
            <label htmlFor="name">Departamento:</label>
            <select
              name="province"
              placeholder="Seleccione"
              style={{ width: 200 }}
              ref={register({
                required: true
              })}
              onChange={countryHandler}
            >
              <option value="">Seleccione</option>
              {country.data.length > 0
                ? country.data.map(o => (
                    <option key={o.id} value={o.code}>
                      {o.department}
                    </option>
                  ))
                : null}
            </select>
            <div className="errors">
              {errors.department && (
                <p>
                  <Icon type="warning" /> Departamento es requerido.
                </p>
              )}
            </div>
          </div>
          <div className="col-md-12">
            <button>Confirmar</button>
          </div>
        </div>
      </form>
      {/* <pre>{JSON.stringify(countries, false, 2)}</pre> */}
    </>
  );
};

export default Form;
