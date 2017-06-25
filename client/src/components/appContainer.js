import { Component, h } from "skatejs";
import Styles from "./appContainer.styles";
const React = { createElement: h };

class AppContainer extends Component {
  renderCallback() {
    return (
      <div>
        <style>{Styles}</style>
        <slot />
      </div>
    );
  }
}

customElements.define("app-container", AppContainer);
