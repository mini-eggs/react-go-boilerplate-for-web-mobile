import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { TouchableWithoutFeedback } from "react-native";

function linkComponent(props) {
  return (
    <TouchableWithoutFeedback onPress={() => props.navigate(props.to)}>
      {props.children}
    </TouchableWithoutFeedback>
  );
}

function mapDispatch(dispatch) {
  return {
    navigate: url => dispatch(push(url))
  };
}

export default connect(null, mapDispatch)(linkComponent);
