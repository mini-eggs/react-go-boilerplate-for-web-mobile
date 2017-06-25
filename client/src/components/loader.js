import { Component } from "../lib";
import LoadingGIF from "../assets/loading.gif";

class Loader extends Component {
  connectedCallback() {
    this.shadow.innerHTML = `
      <style>
        img {
          flex: 1;
        }
      </style>
      <img src="${LoadingGIF}" />
    `;
  }
}

customElements.define("app-loader", Loader);
