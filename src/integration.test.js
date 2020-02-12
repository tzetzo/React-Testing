import { storeFactory } from "../test/testUtils";
import { guessWord } from "./actions";

describe("guessWord action dispatcher", () => {
  const secretWord = "party";
  const unsuccessfulGuess = "train";

  describe("no guessed words", () => {
    let store;
    const initialState = { secretWord };
    beforeEach(() => {
      store = storeFactory(initialState); //initialize the store with the secretWord
    });

    test("updates state correctly for unsuccessful guess", () => {
      const expectedState = {
        ...initialState,
        success: false,
        guessedWords: [{ guessedWord: unsuccessfulGuess, letterMatchCount: 3 }]
      };
      store.dispatch(guessWord(unsuccessfulGuess));

      expect(store.getState()).toEqual(expectedState);
    });

    test("updates state correctly for successful guess", () => {
      const expectedState = {
        ...initialState,
        success: true,
        guessedWords: [{ guessedWord: secretWord, letterMatchCount: 5 }]
      };
      store.dispatch(guessWord(secretWord));
      expect(store.getState()).toEqual(expectedState);
    });
  });
  describe("some guessed words", () => {
    const guessedWords = [{ guessedWord: "agile", letterMatchCount: 1 }];
    const initialState = { guessedWords, secretWord };
    let store;
    beforeEach(() => {
      store = storeFactory(initialState);
    });

    test("updates state correctly for unsuccessful guess", () => {
      const expectedState = {
        secretWord,
        success: false,
        guessedWords: [
          ...guessedWords,
          { guessedWord: unsuccessfulGuess, letterMatchCount: 3 }
        ]
      };
      store.dispatch(guessWord(unsuccessfulGuess));

      expect(store.getState()).toEqual(expectedState);
    });
    test("updates state correctly for successful guess", () => {
      const expectedState = {
        secretWord,
        success: true,
        guessedWords: [
          ...guessedWords,
          { guessedWord: secretWord, letterMatchCount: 5 }
        ]
      };
      store.dispatch(guessWord(secretWord));
      expect(store.getState()).toEqual(expectedState);
    });
  });
});