import React from "react";

import Enzyme from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
Enzyme.configure({
  adapter: new EnzymeAdapter(),
  disableLifecycleMethods: true
});

import { shallow } from "enzyme";

import { findByTestAttr, storeFactory } from "../test/testUtils";
import Input, { UnconnectedInput } from "./Input";

/**
 * Factory function to create a ShallowWrapper for the Input component.
 * @function setup
 * @param {object} initialState - Initial state for this setup.
 * @returns {ShallowWrapper}
 */
// Enzyme recommended approach:
const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  // console.log(store.getState());
  const wrapper = shallow(<Input store={store} />)
    .dive() //gets the child component or element; used only with connected to Redux Store Components!
    .dive();
  return wrapper;
};
// master
// Redux recommended approach:
// const setup = (props = { success: false }) => {
//   return shallow(<Input {...props} />);
//   //console.log(wrapper.debug());
// };

describe("render", () => {
  describe("word has not been guessed", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup();
    });

    test("renders component without error", () => {
      // console.log(wrapper.debug());
      const component = findByTestAttr(wrapper, "component-input");
      expect(component).toHaveLength(1);
    });

    test("renders input box", () => {
      const inputBox = findByTestAttr(wrapper, "input-box");
      expect(inputBox).toHaveLength(1);
    });

    test("renders submit button", () => {
      const submitButton = findByTestAttr(wrapper, "submit-button");
      expect(submitButton).toHaveLength(1);
    });
  });

  describe("word has been guessed", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup({ success: true });
    });

    test("renders component without error", () => {
      const component = findByTestAttr(wrapper, "component-input");
      expect(component).toHaveLength(1);
    });

    test("does not render input box", () => {
      const inputBox = findByTestAttr(wrapper, "input-box");
      expect(inputBox.exists()).toEqual(false);
    });

    test("does not render submit button", () => {
      const submitButton = findByTestAttr(wrapper, "submit-button");
      expect(submitButton.exists()).toEqual(false);
    });
  });
});

describe("redux props", () => {
  test("has success piece of state as prop", () => {
    const success = true;
    const wrapper = setup({ success });
    const successProp = wrapper.instance().props.success; //access the props inside the shallow rendered component
    expect(successProp).toBe(true);
  });
  test("has guessWord action creator as a prop", () => {
    const wrapper = setup();
    const guessWordProp = wrapper.instance().props.guessWord; //access the props inside the shallow rendered component
    expect(guessWordProp).toBeInstanceOf(Function);
  });
});

describe("`guessWord` action creator call", () => {
  let guessWordMock;
  let wrapper;
  const guessedWord = "train";
  beforeEach(() => {
    //create the mock function:
    guessWordMock = jest.fn();

    const props = {
      guessWord: guessWordMock
    };

    //set up app component with guessWordMock as the guessWord prop
    wrapper = shallow(<UnconnectedInput {...props} />);

    //add value to input box:
    wrapper.instance().inputBox.current = { value: guessedWord };

    const submitButton = findByTestAttr(wrapper, "submit-button");
    submitButton.simulate("click", { preventDefault() {} });
  });

  test("calls `guessWord` when button is clicked", () => {
    //check to see if mock run:
    const guessWordCallCount = guessWordMock.mock.calls.length;
    console.log(guessWordMock.mock.calls);
    expect(guessWordCallCount).toBe(1);
  });

  test("calls `guessWord` with input value as argument", () => {
    expect(guessWordMock.mock.calls[0][0]).toBe(guessedWord);
  });
});
