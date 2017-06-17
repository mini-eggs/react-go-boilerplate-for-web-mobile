import React from "react";
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
      <Message message="Home" />
      <Link to="account">
        <Text>Account page</Text>
      </Link>
    </Container>
  );
}
