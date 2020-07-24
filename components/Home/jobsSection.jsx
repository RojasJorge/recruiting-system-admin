import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button } from 'antd';
// import cities from "../../../../api/gt.json";
import { Card } from '../../elements';
import Icon from '../../../../assets/companyIcon.png';
const { Option, OptGroup } = Select;

const JobsPublic = props => {
  const btnStyles = {
    width: 200,
    height: 200,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginLeft: 'auto',
    marginTop: 10,
  };

  const initalState = {
    search: [],
    title: '',
    all: '',
    city: '',
    init: 'no-busquedad',
    new: 'old',
  };

  const [state, setSearch] = useState(initalState);
  const companiesName = e => {
    if (props.companies) {
      const single = props.companies.filter(o => o.id == e);
      if (single.length > 0) {
        return single[0]['name'];
      }
    } else {
      return e;
    }
  };

  const onSubmit = e => {
    e.preventDefault();

    let response = [];
    response = props.jobs.filter(current => {
      const string3 = `${current['profession']['name']} ${current['location']['city']} ${current['title']}`.toLowerCase();
      const string = `${current['profession']['name']}`.toLowerCase();
      const string2 = `${current['location']['city']}`.toLowerCase();
      const result =
        state.title && state.city
          ? string.indexOf(state.title) > -1 && string2.indexOf(state.city) > -1
          : state.title && !state.city
          ? string.indexOf(state.title) > -1
          : !state.title && state.city
          ? string2.indexOf(state.city) > -1
          : string.indexOf(state.title) > -1;
      return result;
    });
    setSearch({ ...state, search: response, init: 'busquedad', new: 'old' });
  };

  return (
    <div className="umana-hm-jobs">
      <div className="umana-layout">
        <h1 className="umana-title-hero">
          <span>{props.jobs && props.jobs.length > 125 ? '+125' : props.jobs.length}</span> plazas
          <br /> plublicadas
        </h1>
        <Form onSubmit={onSubmit} className="umana-form form-talent">
          {/* <Form.Item className="umana-form__item small" name="search">
            <Input
              addonBefore={<i className="material-icons">business_center</i>}
              placeholder={`Puestos a los que deseas aplicar`}
              onChange={e =>
                setSearch({
                  ...state,
                  all: e.target.value.trim().toLowerCase(),
                  new: "new",
                })
              }
              name="search"
            />
          </Form.Item> */}
          <Form.Item className="umana-form__item medium" name="Position">
            <Select
              value={state.title}
              onChange={e =>
                setSearch({
                  ...state,
                  title: e.trim().toLowerCase(),
                  new: 'new',
                })
              }
              placeholder="Puesto"
              showSearch
              className="position-select"
            >
              <Option value="">Todos los puestos</Option>
              {props.areas
                ? props.areas.map((o, idx) => (
                    <OptGroup key={idx} label={o.name}>
                      {props.positions
                        .filter(f => f.parent === o.id)
                        .map((m, index) => (
                          <Option key={index} value={m.name}>
                            {m.name}
                          </Option>
                        ))}
                    </OptGroup>
                  ))
                : null}
            </Select>
          </Form.Item>
          <Form.Item className="umana-form__item small" name="location">
            <Select
              value={state.city}
              onChange={e =>
                setSearch({
                  ...state,
                  city: e.trim().toLowerCase(),
                  new: 'new',
                })
              }
              placeholder="Lugar"
              showSearch
              className="city-select"
            >
              <Option value="">Todos los municipios</Option>
              {cities.map((e, index) => (
                <OptGroup key={index} label={e.department}>
                  {e.municipalities.map((o, idx) => (
                    <Option key={idx} value={o}>
                      {o}
                    </Option>
                  ))}
                </OptGroup>
              ))}
            </Select>
          </Form.Item>
          <br />
          {state.search.length === 0 && state.init === 'busquedad' && state.new === 'old' ? (
            <h4>{`No hay resultados de ${state.title} ${state.title && state.city ? 'y' : ''} ${
              state.city
            }`}</h4>
          ) : null}
          <Button htmlType="submit" type="orange" style={btnStyles}>
            <i className="material-icons">search</i>
            Búscar
          </Button>
        </Form>
        {props.jobs ? (
          <div className="umana-list full-width">
            {!state.search.length > 0 && state.init === 'no-busquedad'
              ? props.jobs.map((e, idx) =>
                  idx <= 2 ? (
                    <Card
                      key={idx}
                      title={e.title}
                      description={e.description}
                      link={`/empresa/plaza/${e.id}`}
                      date={{ date: e.expiration_date, type: 'Expira' }}
                      theme="orange"
                      parentInfo={{
                        avatar: Icon,
                        title: 'Nombre de la Empresa',
                        description: e.location.city,
                      }}
                      align="left"
                    />
                  ) : null,
                )
              : state.search.map((e, idx) =>
                  idx <= 2 ? (
                    <Card
                      key={idx}
                      title={e.title}
                      description={e.description}
                      link={`/empresa/plaza/${e.id}`}
                      date={{ date: e.expiration_date, type: 'Expira' }}
                      theme="orange"
                      parentInfo={{
                        avatar: Icon,
                        title: 'Nombre de la Empresa',
                        description: e.location.city,
                      }}
                      align="left"
                    />
                  ) : null,
                )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default JobsPublic;
