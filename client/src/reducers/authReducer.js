import { SIGN_IN, SIGN_OUT } from "../actions/types";
/*(222) add USER_ID check from gapi.auth2.getAuthInstance().currentUser.
google assigned ID automatically
gapi.auth2.getAuthInstance().currentUser.get().getId()
*/
let INITIAL_STATE = {
  isSignedIn: null,
  userID: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, userId: action.payload };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null };
    default:
      return state;
  }
};
