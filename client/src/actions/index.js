import streams from "../apis/streams";
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

/*(239) receive values which inputed in forms as argument */
export const createStream = formValues => async dispatch => {
  streams.post("/streams", formValues);
};
