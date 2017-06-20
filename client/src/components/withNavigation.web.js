import { connect } from "react-redux";
import { push } from "react-router-redux";

function mapDispatch(dispatch) {
  return {
    navigation: {
      navigate: url => dispatch(push(url))
    }
  };
}

export default function(Component) {
  return connect(null, mapDispatch)(Component);
}
