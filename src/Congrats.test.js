import React from "react";

import { shallow } from "enzyme";
// The following are extracted to setupTests.js
// import Enzyme, { shallow } from "enzyme";
// import EnzymeAdapter from "enzyme-adapter-react-16";
// Enzyme.configure({
//   adapter: new EnzymeAdapter(),
//   disableLifecycleMethods: true
// });

import { findByTestAttr, checkProps } from "../test/testUtils";
import Congrats from "./Congrats";

// const defaultProps = { success: false };

/** Specific to each Component
 * Factory function to create a ShallowWrapper for the Congrats component.
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @returns {ShallowWrapper}
 */
const setup = (props = { success: false }) => {
  // const setupProps = { ...defaultProps, ...props };
  return shallow(<Congrats {...props} />);
};

test("renders without error", () => {
  const wrapper = setup();
  // console.log(wrapper.debug());
  const congratsComponent = findByTestAttr(wrapper, "component-congrats");
  expect(congratsComponent).toHaveLength(1);
});

test("renders no text when `success` prop is false", () => {
  const wrapper = setup();
  // console.log(wrapper.debug());
  const congratsComponent = findByTestAttr(wrapper, "component-congrats");
  // expect(congratsComponent).toHaveLength(0);
  expect(congratsComponent.text()).toBe("");
});

test("renders non-empty congrats message when `success` prop is true", () => {
  const wrapper = setup({ success: true });

  const congratsMessage = findByTestAttr(wrapper, "congrats-message");

  expect(congratsMessage.text()).not.toBe("");
});

//PropTypes testing
test("does not throw warning with expected props", () => {
  const expectedProps = { success: true };
  checkProps(Congrats, expectedProps);
});
