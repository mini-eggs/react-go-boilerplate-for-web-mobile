import { Component as SkateComponent, h } from "skatejs";
const React = { createElement: h };

export class Component extends SkateComponent {
  renderCallback() {
    return (
      <div>
        <style>
          {this.styles()}
        </style>
        {this.render()}
      </div>
    );
  }

  styles() {
    return `
    `;
  }
}
