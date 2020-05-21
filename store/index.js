import {
  createStore
} from "easy-peasy";

import auth from "./auth";
import users from "./users";
import profile from "./profile";
import tools from "./tools";
import collections from "./collections";
import companies from "./companies";

const store = createStore({
  auth,
  users,
  profile,
  tools,
  collections,
  companies,
});

export default store;