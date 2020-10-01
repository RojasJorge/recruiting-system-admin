import { Select } from 'antd';
import { useState, useEffect } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import xhr from '../../xhr';
import { isEmpty } from 'lodash';

const Filter = props => {
  // const collections = useStoreState(state => state.collections);
  // const fill = useStoreActions(actions => actions.collections.fill);

  // const getOptions = async () => {
  //   await xhr()
  //     .get(`/career`, localStorage.getItem('uToken'))
  //     .then(res => {
  //       res.type = false;
  //       fill({ data: res.data, type: 'career' });
  //     })
  //     .catch(err => console.log(err));
  // };
  //
  // useEffect(() => {
  //   getOptions();
  // }, []);

  if (!isEmpty(props.collectionsState)) {
    return (
      <div className="umana-filter" style={{ marginTop: 20 }}>
        <Select placeholder="Seleccione un puesto" defaultValue="all">
          <Select.Option key="all" value="all">
            Todos los puestos
          </Select.Option>
          {props.collectionsState
            ? props.collectionsState.map((e, idx) =>
                e.children ? (
                  <Select.OptGroup key={e.id} label={e.name}>
                    {e.children
                      ? e.children.map((c, i) => (
                          <Select.Option key={c.id + '-' + i} value={c.id}>
                            {c.name}
                          </Select.Option>
                        ))
                      : null}
                  </Select.OptGroup>
                ) : null,
              )
            : null}
        </Select>
        <p className={`visible-${props.visible}`}>No hay plazas con ese puesto</p>
      </div>
    );
  }
  return (
    <div className="umana-filter" style={{ marginTop: 20 }}>
      <h4>Todas las plazas</h4>
    </div>
  );
};

export default Filter;
