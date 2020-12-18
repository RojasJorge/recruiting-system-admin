import { Input, AutoComplete } from 'antd';
import { useStoreState } from 'easy-peasy';
import PropTypes from 'prop-types';
import { useState } from 'react';
import xhr from '../../xhr';

const SearchApi = props => {
  const companies = useStoreState(state => state.companies);
  const renderItem = (title, id, location) => {
    return {
      value: title,
      location: location,
      id: id,
    };
  };
  const [filter, addFilter] = useState(companies.company.items || []);
  const [missing, isMissing] = useState(false);
  const newObjs = filter.map(e => renderItem(e.name, e.id, e.location));

  const onSearch = async value => {
    const serch = {
      type: 'companies',
      query: {
        name: 'term_in_tables',
        variables: {
          limit: 10,
          term: value,
        },
      },
    };
    if (value) {
      await xhr()
        .post(`/search`, JSON.stringify(serch))
        .then(res => {
          addFilter(filter => [...filter, ...res.data.companies]);
          props.setValidation(false);
          isMissing(false);
        })
        .catch(err => isMissing(true));
    } else {
      props.onClear();
      props.setValidation(true);
    }
  };

  const onSelect = (company, obj) => {
    props.onSelectOption(obj);
  };

  return (
    <div className={`umana-searchfilter validation-${props.validation}`}>
      <label>
        <span className="required">*</span> Busca o selecciona una empresa
      </label>
      <AutoComplete
        dropdownMatchSelectWidth={true}
        options={newObjs}
        onSelect={(e, option) => onSelect(e, option)}
        filterOption={(inputValue, option) => option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
      >
        <Input.Search size="large" placeholder="Buscar" onSearch={e => onSearch(e)} />
      </AutoComplete>
      {missing ? 'Ha ocurrido un error' : ''}
    </div>
  );
};
SearchApi.propTypes = {
  setCompanyInfo: PropTypes.func,
  setCompany: PropTypes.func,
  setValidation: PropTypes.func,
  onSelectOption: PropTypes.func,
  onClear: PropTypes.func,
  validation: PropTypes.bool,
};

SearchApi.defaultProps = {
  setCompanyInfo: () => {},
  setValidation: () => {},
  setCompany: () => {},
  onSelectOption: () => {},
  onClear: () => {},
  validation: false,
};
export default SearchApi;
