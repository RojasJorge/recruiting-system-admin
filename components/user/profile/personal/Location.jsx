import { Form, Divider, Input, InputNumber, Select } from 'antd';
import { find } from 'lodash';
import { useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';

const FormItem = Form.Item;

const Location = ({ country, selectCountry, location, addLocation }) => {
  /** Get countries */
  const countries = useStoreState(state => state.tools.countries);

  /** Slugify string */
  const slugify = useStoreActions(actions => actions.tools.slugify);

  const selectHandler = (e, type) => {
    switch (type) {
      case 'country':
        addLocation({ ...location, country: e });
        selectCountry(find(countries, o => o.code === e));
        break;
      case 'province':
        addLocation({
          ...location,
          province: find(country.data, o => o.id === e),
          city: {
            name: '',
            slug: '',
          },
        });
        break;
      case 'city':
        const province = location.province;
        const city = find(province.municipalities, o => o === e);
        addLocation({
          ...location,
          city: {
            name: city,
            slug: slugify(city),
          },
          province: { ...location.province, slug: slugify(province.department) },
        });
        break;
    }
  };

  return (
    <>
      <div className="col-md-12">
        <Divider orientation="left">Ubicación actual</Divider>
      </div>
      <div className="col">
        <label htmlFor="name">País:</label>
        <FormItem name="country" rules={[{ required: true, message: 'El campo País es requerido.' }]}>
          <Select
            name="country"
            placeholder="Seleccione"
            autoComplete="off"
            style={{ width: '100%' }}
            onChange={e => selectHandler(e, 'country')}
            size="large"
            showSearch>
            {countries.length > 0
              ? countries.map(o => (
                  <Select.Option key={o.code} value={o.code}>
                    {o.name}
                  </Select.Option>
                ))
              : null}
          </Select>
        </FormItem>
      </div>
      <div className="col">
        <label htmlFor="name">Departamento:</label>
        <FormItem
          name="province"
          autoComplete="nope"
          rules={[{ required: true, message: 'El campo Departamento es requerido.' }]}
        >
          <Select name="province" placeholder="Seleccione" onChange={e => selectHandler(e, 'province')} style={{ width: '100%' }} size="large" showSearch>
            {country.data.length > 0
              ? country.data.map(o => (
                  <Select.Option key={o.id} value={o.code}>
                    {o.department}
                  </Select.Option>
                ))
              : null}
          </Select>
        </FormItem>
      </div>
      <div className="col">
        <label htmlFor="name">Municipio:</label>
        <FormItem name="city" rules={[{ required: true, message: 'El campo Municipio es requerido.' }]}>
          <Select name="city" placeholder="Seleccione" onChange={e => selectHandler(e, 'city')} style={{ width: '100%' }} size="large" showSearch>
            {location.province.municipalities && location.province.municipalities.length > 0
              ? location.province.municipalities.map((o, i) => (
                  <Select.Option key={i} value={o}>
                    {o}
                  </Select.Option>
                ))
              : null}
          </Select>
        </FormItem>
      </div>
      <div className="col-md-12"></div>
      <div className="col-md-4">
        <label htmlFor="zone">Zona:</label>
        <FormItem name="zone" rules={[{ required: true, message: 'El campo Zona es requerido.' }]}>
          <InputNumber min={0} size="large" style={{ width: '100%' }} />
        </FormItem>
      </div>
      <div className="col">
        <label htmlFor="zone">Dirección:</label>
        <FormItem name="address" rules={[{ required: true, message: 'El campo Dirección es requerido.' }]}>
          <Input size="large" style={{ width: '100%' }} />
        </FormItem>
      </div>
    </>
  );
};

export default Location;
