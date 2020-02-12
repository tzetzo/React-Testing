import React from "react";

import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
Enzyme.configure({
  adapter: new EnzymeAdapter(),
  disableLifecycleMethods: true
});

import { findByTestAttr, storeFactory } from "../test/testUtils";
import App, { UnconnectedApp } from "./App";

/**
 * Factory function to create a ShallowWrapper for the App component.
 * @function setup
 * @param {object} initialState - Initial state for this setup.
 * @returns {ShallowWrapper}
 */
// Enzyme recommended approach:
const setup = (state = {}) => {
  const store = storeFactory(state);
  const wrapper = shallow(<App store={store} />)
    .dive() //gets the child component or element
    .dive();
  return wrapper;
};

describe("render", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });

  test("renders component without error", () => {
    // console.log(wrapper.debug());
    const component = findByTestAttr(wrapper, "component-app");
    expect(component).toHaveLength(1);
  });
});

describe("redux props", () => {
  test("has success piece of state as prop", () => {
    const wrapper = setup({ success: true });
    const successProp = wrapper.instance().props.success; //access the props inside the shallow rendered component
    expect(successProp).toBe(true);
  });
  test("has guessedWords piece of state as prop", () => {
    const guessedWords = [{ guessedWord: "train", letterMatchCount: 3 }];
    const wrapper = setup({ guessedWords });
    const guessedWordsProp = wrapper.instance().props.guessedWords; //access the props inside the shallow rendered component
    expect(guessedWordsProp).toEqual(guessedWords);
  });
  test("has getSecretWord action creator as a prop", () => {
    const wrapper = setup();
    const getSecretWordProp = wrapper.instance().props.getSecretWord; //access the props inside the shallow rendered component
    expect(getSecretWordProp).toBeInstanceOf(Function);
  });
});

test("`getSecretWord` runs on App mount", () => {
  //create the mock function:
  const getSecretWordMock = jest.fn();

  const props = {
    getSecretWord: getSecretWordMock,
    success: false,
    guessedWords: []
  };

  //set up app component with getSecretWordMock as the getSecretWord prop
  const wrapper = shallow(<UnconnectedApp {...props} />);

  //run lifecycle method:
  wrapper.instance().componentDidMount();

  //check to see if mock run:
  const getSecretWordCallCount = getSecretWordMock.mock.calls.length;

  expect(getSecretWordCallCount).toBe(1);
});
