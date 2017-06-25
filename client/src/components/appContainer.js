import { Component } from "../lib";

class AppContainer extends Component {
  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        div {
          min-height: 100vh;
          display: flex;
          flex: 1;
          justify-content: center;
          align-items: stretch;
          flex-direction: column;
        }
      </style>
      <div>
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("app-container", AppContainer);
