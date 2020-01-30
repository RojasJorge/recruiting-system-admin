import {
  thunk
} from "easy-peasy";

const tools = {
  makeRandomId: thunk((actions, payload) => {
    var rand = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < payload; i++) {
      rand += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return rand;
  })
};

export default tools;