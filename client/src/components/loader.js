import { Component, h } from "skatejs";
import Styles from "./loader.styles";
import LoadingGIF from "../assets/loading.gif";
const React = { createElement: h };

class Loader extends Component {
  renderCallback() {
    return (
      <div>
        <style>{Styles}</style>
        <img alt="Loading icon" src={LoadingGIF} />
      </div>
    );
  }
}

customElements.define("app-loader", Loader);
