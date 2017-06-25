import { Component } from "../lib";

class Details extends Component {
  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        div {
          display: flex;
          flex: 1;
          justify-content: center;
          align-items: center;
        }
      </style>
      <div>
        <h1>wow!</h1>
      </div>
    `;
  }
}

customElements.define("app-details", Details);
