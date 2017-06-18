import React from "react";
import { withNavigation } from "react-navigation";

class LinkComponent extends React.Component {
  componentWillReceiveProps({ to, trigger }) {
    if (trigger && !this.props.trigger) {
      this.props.navigation.navigate(to);
    }
  }

  render() {
    return null;
  }
}

export default withNavigation(LinkComponent);
