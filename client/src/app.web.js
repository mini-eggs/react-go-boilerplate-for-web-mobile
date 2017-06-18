import React from "react";
import { AppRegistry } from "react-native";
import { injectGlobal } from "styled-components";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import Thunk from "redux-thunk";
import { offline } from "redux-offline";
import offlineConfig from "redux-offline/lib/defaults";
import { HashRouter } from "react-router-dom";
import { routerReducer, routerMiddleware } from "react-router-redux";
import createHistory from "history/createHashHistory";
import { Route, Switch, Redirect } from "react-router";

/**
 * Components
 */
import Reducers from "./reducers/";
import Home from "./scenes/home";
import Account from "./scenes/account";
import Login from "./scenes/login";
import Signup from "./scenes/signup";

/**
 * Configuration.
 */
const history = createHistory();
const routerMiddlewareCreated = routerMiddleware(history);
const reducers = combineReducers({ ...Reducers, route: routerReducer });
const appliedMiddlewards = applyMiddleware(routerMiddlewareCreated, Thunk);
const composedMiddlewards = compose(appliedMiddlewards, offline(offlineConfig));
const storeParams = [reducers, composedMiddlewards];
const store = createStore(...storeParams);

/**
 * Main.
 */
export default function app() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Redirect exact path="/" to="/home" />
          <Route path="/home" exact={true} component={Home} />
          <Route path="/account" exact={true} component={Account} />
          <Route path="/login" exact={true} component={Login} />
          <Route path="/signup" exact={true} component={Signup} />
        </Switch>
      </HashRouter>
    </Provider>
  );
}

injectGlobal`

  body div#root > div {
    height: 100vh;
  }

  * {
    box-shadow: none !important;
    outline: none !important;
  }

`;

AppRegistry.registerComponent("app", () => app);

AppRegistry.runApplication("app", {
  rootTag: document.getElementById("root")
});
