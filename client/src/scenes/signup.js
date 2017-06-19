import React from "react";
import { View, StatusBar } from "react-native";
import { connect } from "react-redux";
import Styled from "styled-components/native";
import spected from "spected";
import { uniq } from "lodash";
import { compose, withHandlers, withState, lifecycle } from "recompose";
import { SignupRequest } from "../reducers/user";
import withNavigation from "../components/withNavigation";
import {
  FlexContainer,
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
function SignupUI(props) {
  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <Inner showsVerticalScrollIndicator={false}>
        <Title>Signup.</Title>
        <SubTitle>It only takes 30 seconds.</SubTitle>
        <Form>
          <Input
            onChangeText={props.setName}
            placeholder="Name"
            value={props.name}
          />
          <Divider />
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
          <Divider />
          <Input
            onChangeText={props.setVerifyPassword}
            placeholder="Verify Password"
            value={props.verifyPassword}
          />
        </Form>
        <Button onPress={props.handleComplete}>
          <ButtonBackground>
            <ButtonText>Signup</ButtonText>
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
function handleSignup({ name, email, password, verifyPassword, dispatch }) {
  const errors = [];

  const status = spected(
    {
      name: [[a => a !== "", "Must have name."]],
      email: [[a => a !== "", "Must have email."]],
      password: [
        [a => a !== "", "Must have password."],
        [a => a === verifyPassword, "Passwords must match."]
      ]
    },
    { name, email, password }
  );

  for (const key in status) {
    if (typeof status[key] !== "boolean") {
      errors.push(status[key][0]);
    }
  }

  if (errors.length > 0) {
    alert(uniq(errors).join(" "));
  } else {
    dispatch(SignupRequest(name, email, password));
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
      withState("name", "setName", ""),
      withState("email", "setEmail", ""),
      withState("password", "setPassword", ""),
      withState("verifyPassword", "setVerifyPassword", ""),
      withHandlers({ handleComplete: state => () => handleSignup(state) }),
      lifecycle({ componentWillReceiveProps: checkToken })
    )(SignupUI)
  )
);
