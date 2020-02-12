import React, { Component } from "react";
import { connect } from "react-redux";
import { guessWord } from "./actions";

export class UnconnectedInput extends Component {
  // state = { inputValue: "" };
  //
  // submitForm = e => {
  //   e.preventDefault();
  //   this.props.guessWord(this.state.inputValue);
  // };
  inputBox = React.createRef();

  render() {
    const contents = !this.props.success && (
      <form className="form-inline" onSubmit={this.submitForm}>
        <input
          ref={this.inputBox}
          type="text"
          className="mb-2 mx-sm-3"
          id="word-guess"
          placeholder="enter guess"
          data-test="input-box"
          // onChange={e => this.setState({ inputValue: e.target.value })}
          // value={this.state.inputValue}
        />
        <button
          className="btn btn-primary mb-2"
          type="submit"
          data-test="submit-button"
          onClick={() => this.props.guessWord(this.inputBox.current.value)}
        >
          Submit
        </button>
      </form>
    );

    return <div data-test="component-input">{contents}</div>;
  }
}

const mapStateToProps = ({ success }) => {
  return { success };
};

export default connect(
  mapStateToProps,
  { guessWord }
)(UnconnectedInput);
