import React from "react";
import Styled from "styled-components/native";

import Message from "./message";

const Container = Styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default function() {
  return (
    <Container>
      <Message message="Drawer" />
    </Container>
  );
}
