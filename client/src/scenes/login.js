import React from "react";
import { View, StatusBar } from "react-native";
import { connect } from "react-redux";
import spected from "spected";
import { uniq } from "lodash";
import { compose, withHandlers, withState, lifecycle } from "recompose";
import { LoginRequest } from "../reducers/user";
import withNavigation from "../components/withNavigation";
import {
  Container,
  Inner,
  Title,
  SubTitle,
  Form,
  Input,
  Divider,
  Button,
  ButtonBackground,
  ButtonText
} from "../styles/form";

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
function handleLogin({ email, password, dispatch }) {
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
}

/**
 * Lifecycles
 */
function checkToken({ token, navigation }) {
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
      withHandlers({ handleComplete: state => () => handleLogin(state) }),
      lifecycle({ componentWillReceiveProps: checkToken })
    )(LoginUI)
  )
);
