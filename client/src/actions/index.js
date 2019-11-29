import { SIGN_IN, SIGN_OUT } from "./types";

// (22) add userId as payload property
export let signIn = userId => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};

export let signOut = () => {
  return {
    type: SIGN_OUT
  };
};
