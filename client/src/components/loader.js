import { Component, h } from "skatejs";
import LoadingGIF from "../assets/loading.gif";
const React = { createElement: h };

const styles = `
  div {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
  }
  img {
    flex: 1;
  }
`;

class Loader extends Component {
  renderCallback() {
    return (
      <div>
        <style>{styles}</style>
        <img src={LoadingGIF} />
      </div>
    );
  }
}

customElements.define("app-loader", Loader);
