import { Component, h } from "skatejs";
import Styles from "./touchable.styles";
const React = { createElement: h };

class Touchable extends Component {
  renderCallback() {
    return (
      <div
        style={this.getAttribute("style")}
        onClick={this.getAttribute("onClick")}
      >
        <style>{Styles}</style>
        <slot />
      </div>
    );
  }
}

customElements.define("app-touchable", Touchable);
