/** @jsx h */
import { h } from "skatejs";
import { Component } from "../lib/";
import LoadingGIF from "../assets/loading.gif";

class Loader extends Component {
  styles = () => require("./loader.css").toString();

  render() {
    return <img alt="Loading icon" src={LoadingGIF} />;
  }
}

customElements.define("app-loader", Loader);
