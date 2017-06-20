import { Alert, Platform } from "react-native";

const initialState = {
  AlertMessages: []
};

const ALERT_MESSAGE = "ALERT_MESSAGE";

export function AddAlertMessage(message) {
  if (Platform.OS !== "web") {
    Alert.alert(message);
  } else {
    alert(message);
  }

  return {
    type: ALERT_MESSAGE,
    payload: message
  };
}

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case ALERT_MESSAGE: {
      return Object.assign({}, state, {
        AlertMessages: [...state.AlertMessages, payload]
      });
    }

    default: {
      return state;
    }
  }
}
