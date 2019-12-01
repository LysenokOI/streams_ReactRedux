import streams from "../apis/streams";
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM
} from "./types";

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
  let response = await streams.post("/streams", formValues);
  dispatch({ type: CREATE_STREAM, payload: response.data }); // получим данные из json db (241)
  console.log(response); //(241)
};

//(242)
export const fetchStreams = () => async dispatch => {
  let response = await streams.get("/streams");
  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = id => async dispatch => {
  let response = await streams.get(`/streams/${id}`);
  dispatch({ type: FETCH_STREAM, payload: response.data });
};

export const editStream = (id, formValues) => async dispatch => {
  let response = await streams.put(`/streams/${id}`, formValues);
  dispatch({ type: EDIT_STREAM, payload: response.data });
};

export const deleteStream = id => async dispatch => {
  await streams.DELETE(`/streams/${id}`);
  dispatch({ type: DELETE_STREAM, payload: id });
};
