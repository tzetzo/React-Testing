import { actionTypes } from "../actions";

/**
 * @function secretWordReducer
 * @param {string} state - secret string.
 * @param {object} action - action to be reduced.
 * @returns {string} - new secret string.
 */

export default (state = "", action) => {
  switch (action.type) {
    case actionTypes.SET_SECRET_WORD:
      return action.payload;
    default:
      return state;
  }
};
