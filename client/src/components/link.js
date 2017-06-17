import React from "react";
import { TouchableHighlight } from "react-native";
import { withNavigation } from "react-navigation";

function linkComponent({ navigation, to, children }) {
  return (
    <TouchableHighlight
      underlayColor="transparent"
      onPress={() => navigation.navigate(to)}
    >
      {children}
    </TouchableHighlight>
  );
}

export default withNavigation(linkComponent);
