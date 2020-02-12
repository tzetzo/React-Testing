import axios from "axios";
import { getLetterMatchCount } from "../helpers";

export const actionTypes = {
  CORRECT_GUESS: "CORRECT_GUESS",
  GUESS_WORD: "GUESS_WORD",
  SET_SECRET_WORD: "SET_SECRET_WORD"
};

/**
 * Returns Redux Thunk function that dispatches GUESS_WORD actions
 * and (conditionally) CORRECT_GUESS action
 * @function guessWord
 * @param {string} guessedWord - Guessed word.
 * @returns {function} - Redux Thunk function.
 */

export const guessWord = guessedWord => (dispatch, getState) => {
  const secretWord = getState().secretWord;

  if (secretWord === guessedWord.toLowerCase()) {
    dispatch({
      type: actionTypes.CORRECT_GUESS
    });
  }

  const letterMatchCount = getLetterMatchCount(guessedWord, secretWord);

  dispatch({
    type: actionTypes.GUESS_WORD,
    payload: { guessedWord, letterMatchCount }
  });
};

export const getSecretWord = () => async dispatch => {
  const response = await axios.get("http://localhost:3030"); //because we use moxios for the tests its never gonna go to this URL

  dispatch({
    type: actionTypes.SET_SECRET_WORD,
    payload: response.data
  });
};
