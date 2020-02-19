import React, { Component } from "react";
import { connect } from "react-redux";
import { getSecretWord } from "./actions";

import GuessedWords from "./GuessedWords";
import Congrats from "./Congrats";
import Input from "./Input";

//export the unconnected component:
export class UnconnectedApp extends Component {
  componentDidMount = () => {
    this.props.getSecretWord();
  };

  render() {
    return (
      <div className="container" data-test="component-app">
        <h1>Jotto</h1>
        <Input />
        <Congrats success={this.props.success} />
        <GuessedWords guessedWords={this.props.guessedWords} />
      </div>
    );
  }
}

const mapStateToProps = ({ success, guessedWords }) => {
  return { success, guessedWords };
};

export default connect(
  mapStateToProps,
  { getSecretWord }
)(UnconnectedApp);

