import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";

class LinkComponent extends React.Component {
  componentWillReceiveProps({ to, trigger }) {
    if (trigger && !this.props.trigger) {
      this.props.navigate(to);
    }
  }

  render() {
    return null;
  }
}

function mapDispatch(dispatch) {
  return {
    navigate: url => dispatch(push(url))
  };
}

export default connect(null, mapDispatch)(LinkComponent);
