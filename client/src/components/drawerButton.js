import React from "react";
import { Image, TouchableHighlight } from "react-native";
import Styled from "styled-components/native";
import { withNavigation } from "react-navigation";

import HamburgerIcon from "../assets/hamburger.png";

const Img = Styled.Image`
  flex: 1;
  width: 25;
  height: 25;
  margin-left: 10;
`;

function drawerButton({ navigation }) {
  return (
    <TouchableHighlight
      underlayColor="transparent"
      onPress={() => navigation.navigate("DrawerOpen")}
    >
      <Img source={HamburgerIcon} resizeMode={Image.resizeMode.contain} />
    </TouchableHighlight>
  );
}

export default withNavigation(drawerButton);
