/** @jsx h */
import { h } from "skatejs";
import { Component } from "../lib";

class AppContainer extends Component {
  styles = () => require("./appContainer.css").toString();
  render = () => <slot />;
}

customElements.define("app-container", AppContainer);
