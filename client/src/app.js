import React from "react";
import { Dimensions } from "react-native";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import Thunk from "redux-thunk";
import { offline } from "redux-offline";
import offlineConfig from "redux-offline/lib/defaults";
import { StackNavigator, DrawerNavigator } from "react-navigation";

/**
 * Components
 */
import Reducers from "./reducers/";
import Home from "./scenes/home";
import Account from "./scenes/account";
import Drawer from "./components/drawer";
import DrawerButton from "./components/drawerButton";

/**
 * Configuration.
 */
const Router = StackNavigator({
  home: {
    screen: Home,
    navigationOptions: { title: "Home", headerLeft: <DrawerButton /> }
  },
  account: {
    screen: Account,
    navigationOptions: { title: "Test" }
  }
});

const drawerWidth = Dimensions.get("window").width * 0.8;

const App = DrawerNavigator(
  { app: { screen: Router } },
  { drawerWidth, contentComponent: () => <Drawer /> }
);

const middlewares = compose(applyMiddleware(Thunk), offline(offlineConfig));
const store = createStore(combineReducers(Reducers), middlewares);

/**
 * Main.
 */
export default function() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
