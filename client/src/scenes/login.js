import React from "react";
import { View, StatusBar } from "react-native";
import { connect } from "react-redux";
import Styled from "styled-components/native";
import spected from "spected";
import { uniq } from "lodash";
import { compose, withHandlers, withState, lifecycle } from "recompose";
import { LoginRequest } from "../reducers/user";
import withNavigation from "../components/withNavigation";

/**
 * Styles
 */
const FlexContainer = Styled.View`
  flex: 1;
`;

const Container = Styled.View`
  flex: 1;
  background-color: #e8702a;
  justify-content: center;
  align-items: stretch;
`;

const Inner = Styled.ScrollView`
  padding-top: 50;
  flex: 1;
  padding-left: 25;
  padding-right: 25;
`;

const Title = Styled.Text`
  font-size: 64;
  color: #fff;
  margin-bottom: 10;
`;

const SubTitle = Styled.Text`
  color: #fff;
  font-size: 18;
`;

const Form = Styled.View`
  background-color: #fff;
  border-radius: 10;
  margin-top: 30;
  margin-bottom: 20;
`;

const Input = Styled.TextInput`
  height: 50;
  padding-left: 10;
  padding-right: 10;
`;

const Divider = Styled.View`
  min-height: 2;
  background-color: rgba(0, 0, 0, 0.2);
`;

const Button = Styled.TouchableWithoutFeedback`
`;

const ButtonBackground = Styled.View`
  background-color: #0c457d;
  border-radius: 10;
  padding-top: 15;
  padding-right: 10;
  padding-bottom: 15;
  padding-left: 10;
`;

const ButtonText = Styled.Text`
  color: #fff;
  font-size: 18;
  text-align: center;
`;

/**
 * UI Component
 */
function LoginUI(props) {
  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <Inner showsVerticalScrollIndicator={false}>
        <Title>Login.</Title>
        <SubTitle>It only takes 30 seconds.</SubTitle>
        <Form>
          <Input
            onChangeText={props.setEmail}
            placeholder="Email"
            value={props.email}
          />
          <Divider />
          <Input
            onChangeText={props.setPassword}
            placeholder="Password"
            value={props.password}
          />
        </Form>
        <Button onPress={props.handleComplete}>
          <ButtonBackground>
            <ButtonText>Login</ButtonText>
          </ButtonBackground>
        </Button>
        <View style={{ height: 400 }} />
      </Inner>
    </Container>
  );
}

/**
 * Validation
 */
function handleComplete({ email, password, dispatch }) {
  return () => {
    const errors = [];

    const status = spected(
      {
        email: [[a => a !== "", "Must have email."]],
        password: [[a => a !== "", "Must have password."]]
      },
      { email, password }
    );

    for (const key in status) {
      if (typeof status[key] !== "boolean") {
        errors.push(status[key][0]);
      }
    }

    if (errors.length > 0) {
      alert(uniq(errors).join(" "));
    } else {
      dispatch(LoginRequest(email, password));
    }
  };
}

/**
 * Lifecycles
 */
function componentWillReceiveProps({ token, navigation }) {
  if (token) {
    navigation.navigate("home");
  }
}

/**
 * Props and state
 */
function mapState({ User }) {
  return { token: User.token };
}

function mapDispatch(dispatch) {
  return { dispatch };
}

export default withNavigation(
  connect(mapState, mapDispatch)(
    compose(
      withState("email", "setEmail", ""),
      withState("password", "setPassword", ""),
      withHandlers({ handleComplete }),
      lifecycle({ componentWillReceiveProps })
    )(LoginUI)
  )
);
