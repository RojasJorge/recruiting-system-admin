import {
  createStore
} from "easy-peasy";

import auth from "./auth";
import users from "./users";
import profile from "./profile";
import tools from "./tools";

const store = createStore({
  auth,
  users,
  profile,
  tools
});

export default store;