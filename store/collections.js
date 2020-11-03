import { action, thunk } from 'easy-peasy';
import { mapKeys, groupBy, remove, find, map, orderBy, isEmpty } from 'lodash';
import axios from 'axios';

export default {
  career: [],
  academic_level: [],
  // total: 0,
  // loading: false,
  /**
   * Get all collections.
   */
  get: thunk(async (actions, payload) => {
    actions.switchLoading(true);
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL_PRODUCTION}/${payload.type.replace('_', '-')}?page=1&offset=1000`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('uToken'),
        },
      })
      .catch(error => {
        console.log(error);
        actions.switchLoading(false);
      })
      .then(response => {
        // typeof response !== 'undefined' ? localStorage.setItem(payload.type.replace('-', '_'), JSON.stringify(response.data.items)) : null;
        typeof response !== 'undefined' ? actions.fill({ data: response.data, type: payload.type.replace('-', '_') }) : null;
        // actions.switchLoading(false);
      });
  }),
  // add
  add: thunk(async (actions, payload) => {
    // actions.switchLoading(true);

    const token = payload.token;
    const type = payload.url;
    delete payload.token;
    delete payload.url;

    /** Send request */
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL_PRODUCTION}/${type}`, JSON.stringify(payload.o), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
      .catch(error => {
        // console.log(error);
        // actions.switchLoading(false);
      })
      .then(response => {
        // actions.switchLoading(false);
        return;
      });
  }),
  // update
  update: thunk(async (actions, payload) => {
    // actions.switchLoading(true);

    const token = payload.token;
    const type = payload.url;
    delete payload.token;
    delete payload.url;

    /** Send request */
    await axios
      .put(`${process.env.NEXT_PUBLIC_API_URL_PRODUCTION}/${type}`, JSON.stringify(payload.o), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
      .catch(error => {
        // console.log(error);
      })
      .then(async response => {
        await actions.get({type: 'career'})
        await actions.get({type: 'academic-level'})
        return;
      });
  }),

  fill: action((state, { data, type }) => {
    // let items = map(data.items, o => {
    //   o.title = React.createElement('div', {
    //     className: 'item--name',
    //     children: [
    //       React.createElement('span', {
    //         key: 'name'
    //       }, o.name), <Button key="edit" icon={<EditOutlined />} type="link" />
    //     ]
    //   });
    //
    //   return o;
    // });

    let items = map(data.items, o => {
      delete o.owner;
      return o;
    });

    let _data = [];
    let _childs = [];

    mapKeys(groupBy(items, 'parent'), (value, key) => {
      /** Find each parent */
      const findParent = find(items, o => o.id === key);

      if (findParent) {
        /** To compare */
        _data.push(value[0]);

        /** Attach to each parent */
        findParent.children = value;

        /** To compare on level 0 */
        _childs.push(findParent);
      }
    });

    remove(items, o => {
      return find(_data, c => c.id === o.id) ? o : null;
    });

    _childs.reduce((accumulator, current, index, arr) => {
      remove(items, o => {
        return find(current.children, c => c.id === o.id) ? o : null;
      });
    }, []);

    state[type] = orderBy(
      map(items, o => {
        if (!isEmpty(o.children)) {
          o.children = orderBy(o.children, ['name'], ['asc']);
        }
        return o;
      }),
      ['name'],
      ['asc'],
    );

    // state.total = data.total;
  }),
  switchLoading: action((state, payload) => {
    state.loading = payload;
  }),
};
