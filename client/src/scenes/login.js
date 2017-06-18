import React from "react";
import { View, StatusBar } from "react-native";
import { connect } from "react-redux";
import Styled from "styled-components/native";
import spected from "spected";
import { uniq } from "lodash";

import TriggerLink from "../components/triggerLink";
import { LoginRequest } from "../reducers/user";

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

const EmailInput = Styled.TextInput`
  height: 50;
  padding-left: 10;
  padding-right: 10;
`;

const PasswordInput = Styled.TextInput`
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
 * UI
 */
function LoginUI(props) {
  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <Inner showsVerticalScrollIndicator={false}>
        <Title>Login.</Title>
        <SubTitle>It only takes 30 seconds.</SubTitle>
        <Form>
          <EmailInput
            onChangeText={props.handleEmail}
            onFocus={props.handleEmailFocus}
            onBlur={props.handleEmailBlur}
            value={props.email}
          />
          <Divider />
          <PasswordInput
            onChangeText={props.handlePassword}
            onFocus={props.handlePasswordFocus}
            onBlur={props.handlePasswordBlur}
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
 * State
 */
const initialState = {
  email: "Email",
  password: "Password"
};
const validationSpec = {
  email: [
    [a => a !== "", "Must have email."],
    [a => a !== initialState.email, "Must have email."]
  ],
  password: [
    [a => a !== "", "Must have password."],
    [a => a !== initialState.password, "Must have password."]
  ]
};
class LoginComponent extends React.Component {
  state = initialState;

  handleEmail = email => {
    this.setState(() => ({ email }));
  };

  handleEmailFocus = () => {
    if (this.state.email === initialState.email) {
      this.setState(() => ({ email: "" }));
    }
  };

  handleEmailBlur = () => {
    if (this.state.email === "") {
      this.setState(() => ({ email: initialState.email }));
    }
  };

  handlePassword = password => {
    this.setState(() => ({ password }));
  };

  handlePasswordFocus = () => {
    if (this.state.password === initialState.password) {
      this.setState(() => ({ password: "" }));
    }
  };

  handlePasswordBlur = () => {
    if (this.state.password === "") {
      this.setState(() => ({ password: initialState.password }));
    }
  };

  handleComplete = () => {
    const errors = [];
    const status = spected(validationSpec, this.state);

    for (const key in status) {
      if (typeof status[key] !== "boolean") {
        errors.push(status[key][0]);
      }
    }

    if (errors.length > 0) {
      alert(uniq(errors).join(" "));
    } else {
      const { email, password } = this.state;
      this.props.dispatch(LoginRequest(email, password));
    }
  };

  componentWillReceiveProps({ token }) {
    if (token && !this.props.token) {
      alert("Login complete.");
      this.setState(() => ({ triggerLink: true }));
    }
  }

  render() {
    return (
      <FlexContainer>
        <LoginUI
          {...this.state}
          handleEmail={this.handleEmail}
          handleEmailFocus={this.handleEmailFocus}
          handleEmailBlur={this.handleEmailBlur}
          handlePassword={this.handlePassword}
          handlePasswordFocus={this.handlePasswordFocus}
          handlePasswordBlur={this.handlePasswordBlur}
          handleComplete={this.handleComplete}
        />
        <TriggerLink to="home" trigger={this.state.triggerLink} />
      </FlexContainer>
    );
  }
}

/**
 * Redux
 */
function mapState(state) {
  return {
    token: state.User.token
  };
}

export default connect(mapState, dispatch => ({ dispatch }))(LoginComponent);
