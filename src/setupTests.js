//Jest auto runs this file before each .test.js file
import Enzyme from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
Enzyme.configure({
  adapter: new EnzymeAdapter(),
  disableLifecycleMethods: true
});
