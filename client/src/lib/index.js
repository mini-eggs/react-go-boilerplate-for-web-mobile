/** @jsx h */
import { Component as SkateComponent, h } from "skatejs";

export class Component extends SkateComponent {
  styles() {
    return "";
  }

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
}
