import { createStore, persist } from 'easy-peasy';

import auth from './auth';
import users from './users';
import profile from './profile';
import tools from './tools';
import collections from './collections';
import companies from './companies';
import jobs from './jobs';

const store = createStore({
  auth: persist(auth),
  users,
  profile,
  tools,
  collections: persist(collections),
  companies,
  jobs,
});

export default store;
