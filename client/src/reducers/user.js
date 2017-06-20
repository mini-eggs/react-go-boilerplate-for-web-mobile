import { post } from "../constants/";
import { AddAlertMessage } from "./error";

const initialState = {
  user: false,
  token: false
};

const UPDATE_USER = "UPDATE_USER";

function updateUser(user, token) {
  return {
    type: UPDATE_USER,
    payload: {
      user,
      token
    }
  };
}

export function LoginRequest(email, password) {
  const url = "/api/user/signin";
  const data = { email, password };

  return async function(dispatch) {
    try {
      const { Data, Token, Status, Message } = await post(url, data);
      if (Status) {
        dispatch(updateUser(Data, Token));
      } else {
        dispatch(AddAlertMessage(Message));
      }
    } catch (err) {
      console.log(err);
    }
  };
}

export function SignupRequest(name, email, password) {
  const url = "/api/user/create";
  const data = { name, email, password };

  return async function(dispatch) {
    try {
      const { Data, Token, Status, Message } = await post(url, data);
      if (Status) {
        dispatch(updateUser(Data, Token));
      } else {
        dispatch(AddAlertMessage(Message));
      }
    } catch (err) {
      console.log(err);
    }
  };
}

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case UPDATE_USER: {
      return Object.assign({}, state, {
        user: payload.user,
        token: payload.token
      });
    }

    default: {
      return state;
    }
  }
}
