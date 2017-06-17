import React from "react";
import { StatusBar } from "react-native";
import Styled from "styled-components/native";

import Message from "../components/message";
import Link from "../components/link";

const Container = Styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = Styled.Text`
  font-size: 24;
  margin-top: 20;
`;

export default function() {
  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <Message message="Home" />
      <Link to="account">
        <Text>Account page</Text>
      </Link>
      <Link to="login">
        <Text>Login page</Text>
      </Link>
    </Container>
  );
}
