import { API, post } from "../constants/";

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
  const url = "/user/login";
  const data = { email, password };

  return async function(dispatch) {
    try {
      const { Data, Token } = await post(url, data);
      dispatch(updateUser(Data, Token));
    } catch (err) {
      console.log(err);
    }
  };
}

export function SignupRequest(name, email, password) {
  const url = "/user/create";
  const data = { name, email, password };

  return async function(dispatch) {
    try {
      const { Data, Token } = await post(url, data);
      dispatch(updateUser(Data, Token));
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
