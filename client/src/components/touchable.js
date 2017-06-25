/** @jsx h */
import { h } from "skatejs";
import { Component } from "../lib/";

class Touchable extends Component {
  styles = () => require("./touchable.css").toString();
  render = () => <slot />;
}

customElements.define("app-touchable", Touchable);
