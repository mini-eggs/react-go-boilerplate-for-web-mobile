import Styled from "styled-components/native";

export const Container = Styled.View`
  flex: 1;
  background-color: #e8702a;
  justify-content: center;
  align-items: stretch;
`;

export const Inner = Styled.ScrollView`
  padding-top: 50;
  flex: 1;
  padding-left: 25;
  padding-right: 25;
`;

export const Title = Styled.Text`
  font-size: 64;
  color: #fff;
  margin-bottom: 10;
`;

export const SubTitle = Styled.Text`
  color: #fff;
  font-size: 18;
`;

export const Form = Styled.View`
  background-color: #fff;
  border-radius: 10;
  margin-top: 30;
  margin-bottom: 20;
`;

export const Input = Styled.TextInput`
  height: 50;
  padding-left: 10;
  padding-right: 10;
`;

export const Divider = Styled.View`
  min-height: 2;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const Button = Styled.TouchableWithoutFeedback`
`;

export const ButtonBackground = Styled.View`
  background-color: #0c457d;
  border-radius: 10;
  padding-top: 15;
  padding-right: 10;
  padding-bottom: 15;
  padding-left: 10;
`;

export const ButtonText = Styled.Text`
  color: #fff;
  font-size: 18;
  text-align: center;
`;
