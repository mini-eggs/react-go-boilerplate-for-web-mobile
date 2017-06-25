/** @jsx h */
import { h } from "skatejs";
import { Component } from "../lib/";
import { Navigate } from "../router";
import("./touchable");

class AppHeader extends Component {
  styles = () => require("./header.css").toString();

  _leftNav() {
    return (
      <div class="header-brand">
        <app-touchable onClick={Navigate("/")} style="display: inline-block;">
          <span>FaceSwap</span>
        </app-touchable>
      </div>
    );
  }

  _rightNav() {
    return (
      <div class="header-links">
        <app-touchable onClick={Navigate("/")} style="display: inline-block;">
          <div>
            <span>Home</span>
          </div>
        </app-touchable>
        <app-touchable
          onClick={Navigate("/about")}
          style="display: inline-block;"
        >
          <div>
            <span>About</span>
          </div>
        </app-touchable>
        <app-touchable
          onClick={Navigate("/more")}
          style="display: inline-block;"
        >
          <div>
            <span>More</span>
          </div>
        </app-touchable>
      </div>
    );
  }

  render() {
    return (
      <div class="header-wrap">
        {this._leftNav()}
        {this._rightNav()}
      </div>
    );
  }
}

customElements.define("app-header", AppHeader);
