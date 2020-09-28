import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, InputNumber, Select } from 'antd';
import countries from '../../data/countries.json';
import { useStoreState, useStoreActions } from 'easy-peasy';
import xhr from '../../xhr';

const { Option, OptGroup } = Select;

const ObjectInput = ({ value = {}, onChange, type, label, required, isChild }) => {
  /* api data */
  const data = useStoreState(state => state.collections);
  const fill = useStoreActions(actions => actions.collections.fill);
  const [info, setInfo] = useState([]);
  const get = () =>
    xhr()
      .get(`/${type}`)
      .then(resp => fill(resp.data))
      .catch(err => console.log(err));

  useEffect(() => {
    setInfo(data.list);
  }, [data.list]);

  useEffect(() => {
    get();
  }, []);
  const initialState = {
    id: '',
    name: '',
  };
  const [objectState, setObjVal] = useState(initialState);
  const [parent, setParent] = useState({});

  const triggerChange = changedValue => {
    if (onChange) {
      onChange({
        ...objectState,
        ...value,
        ...changedValue,
      });
    }
  };
  const change = ObjectInput => {
    return (value = ObjectInput);
  };

  const ObjectInputValue = {
    id: objectState.id,
    name: objectState.name,
  };

  const ObjectInputProps = {
    value: ObjectInputValue,
    onChange: change(ObjectInput),
  };

  const handlenChange = (e, type) => {
    if (e !== 'otros') {
      if (isChild) {
        const parentS = info.map(i =>
          i.children ? (i.children.filter(f => f.id === e) ? (i.children.filter(f => f.id === e).length > 0 ? setParent(i.children.filter(f => f.id === e)) : null) : null) : null,
        );
      }
      // setObjVal({ ...objectState, id: e, name: name['name'] });
    }
    if (e === 'otros') {
      setObjVal({ ...objectState, id: e, name: e });
    }
  };

  return (
    <div className="umana-form--group" style={{ paddingBottom: 0 }}>
      <span className="form-item--sm ant-form-item">
        <label>
          {required ? <span className="required">*</span> : null}
          {label}
        </label>
        {isChild ? (
          <Select
            showSearch
            optionFilterProp="title"
            filterprop="title"
            filterOption={(input, option) => {
              if (option.children) {
                return strForSearch(option.children).includes(strForSearch(input));
              } else {
                if (option.options) {
                  return strForSearch(option.label).includes(strForSearch(input));
                }
                return false;
              }
            }}
            onChange={e => handlenChange(e, 'id')}
          >
            {label == 'puesto' ? (
              <Select.OptGroup key="otros" label="Otros">
                <Select.Option key="otro" value="otros">
                  Otro, agregar puesto
                </Select.Option>
              </Select.OptGroup>
            ) : null}
            {info
              ? info
                  .sort((a, b) => (a.name > b.name ? 1 : -1))
                  .map((e, idx) => (
                    <OptGroup key={idx} label={e.name}>
                      {e.children
                        ? e.children
                            .sort((z, x) => (z.name > x.name ? 1 : -1))
                            .map((m, index) => (
                              <Option key={m.id} value={m.id}>
                                {m.name}
                              </Option>
                            ))
                        : null}
                    </OptGroup>
                  ))
              : null}
          </Select>
        ) : (
          <Select showSearch onChange={e => handlenChange(e, 'id')} value={location.country}>
            {info
              ? info.map((c, idx) => (
                  <Select.Option key={idx} value={c.id}>
                    {c.name}
                  </Select.Option>
                ))
              : null}
          </Select>
        )}
      </span>
    </div>
  );
};

ObjectInput.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  isChild: PropTypes.bool,
};

ObjectInput.defaultProps = {
  type: 'career',
  label: 'Puesto',
  required: false,
  isChild: false,
};

export default ObjectInput;
