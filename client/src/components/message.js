import React from "react";
import Styled from "styled-components/native";

const Message = Styled.Text`
  font-size: 48;
`;

export default function({ message }) {
  return <Message>{message}</Message>;
}
