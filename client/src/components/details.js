/** @jsx h */
import { h } from "skatejs";
import { Component } from "../lib/";

class Details extends Component {
  render() {
    return <h1>wow!</h1>;
  }

  styles() {
    return `
      :host {
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
      }
    `;
  }
}

customElements.define("app-details", Details);
