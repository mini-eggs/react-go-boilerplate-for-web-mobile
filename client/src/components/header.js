import { Component } from "../lib";
import Router from "../router";

const styles = `
  .app-header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background-color: lightblue;
  }

  .app-header .header-wrap {
    margin: 0 auto;
    max-width: 1000px;
  }

  .app-header .header-brand {
    float: left;
    padding: 0 15px;
    cursor: pointer;
  }
  .app-header .header-brand:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .app-header .header-brand span {
    font-size: 24px;
    color: white;
    line-height: 50px;
  }

  .app-header .header-links {
    float: right;
  }

  .app-header .header-links div {
    display: inline-block;
    padding: 0 15px;
    cursor: pointer;
  }

  .app-header .header-links div span {
    line-height: 50px;
    color: white;
  }
  .app-header .header-links div:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 748px) {
    .header-links {
      display: none;
    }
  }
`;

const headerHTML = `
  <div class="app-header">
    <div class="header-wrap">
      <div class="header-brand">
        <span>FaceSwap</span>
      </div>
      <div class="header-links">
        <div>
          <span>Home</span>
        </div>
        <div>
          <span>About</span>
        </div>
        <div>
          <span>More</span>
        </div>
      </div>
    </div>
  </div>
`;

class AppHeader extends Component {
  connectedCallback() {
    this.shadow.innerHTML = `
      <style>${styles}</style>
      ${headerHTML}
    `;
    this.events();
  }

  events() {
    this.find(".header-brand").addEventListener("click", () =>
      Router.navigate("/")
    );

    const links = this.findAll(".header-links div");
    links[0].addEventListener("click", () => Router.navigate("/"));
    links[1].addEventListener("click", () => Router.navigate("/about"));
    links[2].addEventListener("click", () => Router.navigate("/more"));
  }

  disconnectedCallback() {
    this.find(".header-brand").removeEventListener("click", () =>
      Router.navigate("/")
    );

    const links = this.findAll(".header-links div");
    links[0].removeEventListener("click", () => Router.navigate("/"));
    links[1].removeEventListener("click", () => Router.navigate("/about"));
    links[2].removeEventListener("click", () => Router.navigate("/more"));
  }
}

customElements.define("app-header", AppHeader);
