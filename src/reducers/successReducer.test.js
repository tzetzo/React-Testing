import { actionTypes } from "../actions";
import successReducer from "./successReducer";

test("returns default initial state of `false` when no action is passed", () => {
  const returnedState = successReducer(undefined, {}); //always pass undefined and an object for the action
  expect(returnedState).toBe(false);
});

test("returns state of true upon receiving an action of type `CORRECT_GUESS`", () => {
  const returnedState = successReducer(undefined, {
    type: actionTypes.CORRECT_GUESS
  });

  expect(returnedState).toBe(true);
});
