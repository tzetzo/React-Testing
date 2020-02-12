import React from "react";

import Enzyme from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
Enzyme.configure({
  adapter: new EnzymeAdapter(),
  disableLifecycleMethods: true
});

import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "../test/testUtils";
import GuessedWords from "./GuessedWords";

const defaultProps = {
  guessedWords: [{ guessedWord: "train", letterMatchCount: 3 }]
};
/**
 * Factory function to create a ShallowWrapper for the GuessedWords component.
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @returns {ShallowWrapper}
 */
const setup = (props = defaultProps) => {
  // const setupProps = { ...defaultProps, ...props };
  return shallow(<GuessedWords {...props} />);
};

test("does not throw warning with expected props", () => {
  checkProps(GuessedWords, defaultProps); //checks if these props correspond to the expected ones from GuessedWords.js
});

describe("if there are no words guessed", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({ guessedWords: [] });
  });
  test("renders without error", () => {
    const component = findByTestAttr(wrapper, "component-guessed-words");
    expect(component).toHaveLength(1);
  });

  test("renders instructions to guess a word", () => {
    const instructions = findByTestAttr(wrapper, "guess-instructions");
    expect(instructions).toHaveLength(1);
    expect(instructions.text()).not.toBe("");
  });
});

describe("if there are words guessed", () => {
  let wrapper;

  const guessedWords = [
    { guessedWord: "train", letterMatchCount: 3 },
    { guessedWord: "agile", letterMatchCount: 1 },
    { guessedWord: "party", letterMatchCount: 5 }
  ];

  beforeEach(() => {
    wrapper = setup({ guessedWords });
  });

  test("renders without error", () => {
    const component = findByTestAttr(wrapper, "component-guessed-words");
    expect(component).toHaveLength(1);
  });

  test("renders 'guessed words' section", () => {
    const guessedWordsNode = findByTestAttr(wrapper, "guessed-words");
    expect(guessedWordsNode).toHaveLength(1);
  });

  test("correct number of guessed words", () => {
    const guessedWordNodes = findByTestAttr(wrapper, "guessed-word");
    expect(guessedWordNodes).toHaveLength(guessedWords.length);
  });
});
