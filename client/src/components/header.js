import { h } from "skatejs";
import { Component } from "../lib/";
import { Navigate } from "../router";
import("./touchable");
const React = { createElement: h };

class AppHeader extends Component {
  _leftNav() {
    return (
      <app-touchable onClick={Navigate("/")} style="display: inline-block;">
        <div class="header-brand" onClick={Navigate("/")}>
          <span>FaceSwap</span>
        </div>
      </app-touchable>
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

  styles() {
    return `
      :host {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 50px;
        background-color: lightblue;
        z-index: 99;
      }

      .header-wrap {
        margin: 0 auto;
        max-width: 1000px;
      }

      .header-brand {
        float: left;
        padding: 0 15px;
        cursor: pointer;
      }

      .header-brand span {
        font-size: 24px;
        color: white;
        line-height: 50px;
      }

      .header-links {
        float: right;
      }

      .header-links div {
        display: inline-block;
        padding: 0 15px;
        cursor: pointer;
      }

      .header-links div span {
        line-height: 50px;
        color: white;
      }

      @media (max-width: 748px) {
        .header-links {
          display: none;
        }
      }
    `;
  }
}

customElements.define("app-header", AppHeader);
