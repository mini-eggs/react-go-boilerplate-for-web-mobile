import React from "react";
import { View, StatusBar, Dimensions } from "react-native";
import { connect } from "react-redux";
import Styled from "styled-components/native";

import TriggerLink from "../components/triggerLink";
import { SignupRequest } from "../reducers/user";

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
        <Title>Signup.</Title>
        <SubTitle>It only takes 30 seconds.</SubTitle>
        <Form>
          <EmailInput
            onChangeText={props.handleName}
            onFocus={props.handleNameFocus}
            onBlur={props.handleNameBlur}
            value={props.name}
          />
          <Divider />
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
          <Divider />
          <PasswordInput
            onChangeText={props.handleVPassword}
            onFocus={props.handleVPasswordFocus}
            onBlur={props.handleVPasswordBlur}
            value={props.vPassword}
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
 * State
 */
const initialState = {
  name: "Name",
  email: "Email",
  password: "Password",
  vPassword: "Verify Password",
  triggerLink: false
};
class SignupComponent extends React.Component {
  state = Object.assign({}, initialState);

  handleChange = type => text => {
    this.setState(state => {
      state[type] = text;
      return state;
    });
  };

  handleFocus = type => () => {
    if (this.state[type] === initialState[type]) {
      this.setState(state => {
        state[type] = "";
        return state;
      });
    }
  };

  handleBlur = type => () => {
    if (this.state[type] === "") {
      this.setState(state => {
        state[type] = initialState[type];
        return state;
      });
    }
  };

  handleComplete = () => {
    const { name, email, password, vPassword } = this.state;

    if (
      name === "" ||
      name === initialState.name ||
      email === "" ||
      email === initialState.email ||
      password === "" ||
      password === initialState.password ||
      vPassword === "" ||
      vPassword === initialState.vPassword ||
      password !== vPassword
    ) {
      return;
    }

    this.props.dispatch(SignupRequest(name, email, password));
  };

  componentWillReceiveProps({ token }) {
    if (token && !this.props.token) {
      alert("Signup complete.");
      this.setState(() => ({ triggerLink: true }));
    }
  }

  render() {
    return (
      <FlexContainer>
        <LoginUI
          {...this.state}
          handleName={this.handleChange("name")}
          handleNameFocus={this.handleFocus("name")}
          handleNameBlur={this.handleBlur("name")}
          handleEmail={this.handleChange("email")}
          handleEmailFocus={this.handleFocus("email")}
          handleEmailBlur={this.handleBlur("email")}
          handlePassword={this.handleChange("password")}
          handlePasswordFocus={this.handleFocus("password")}
          handlePasswordBlur={this.handleBlur("password")}
          handleVPassword={this.handleChange("vPassword")}
          handleVPasswordFocus={this.handleFocus("vPassword")}
          handleVPasswordBlur={this.handleBlur("vPassword")}
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

export default connect(mapState, dispatch => ({ dispatch }))(SignupComponent);
