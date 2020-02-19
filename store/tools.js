import {
  thunk,
  action
} from "easy-peasy";

import axios from "axios";
import countries from "../assets/misc/locations.json";

const tools = {
  countries,
  makeRandomId: thunk((actions, payload) => {
    let rand = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (var i = 0; i < payload; i++) {
      rand += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return rand;
  }),
  // getCountries: thunk(async (actions, payload) => {
  //   try {
  //     const response = await axios.get('https://restcountries.eu/rest/v2/alpha/?codes=col;gt;ve');

  //     if (response)
  //       actions.fill(response.data);
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }),
  // fill: action((state, payload) => {
  //   state.countries = payload;
  // })
};

export default tools;