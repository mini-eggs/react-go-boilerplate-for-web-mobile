/** @jsx h */
import { h } from "skatejs";
import { Component } from "../lib/";
import CameraSVG from "../assets/camera.svg";
import("./loader");
import("./touchable");

class ChoosePhoto extends Component {
  styles = () => require("./choosePhoto.css").toString();

  static get props() {
    return {
      image: null,
      loading: false
    };
  }

  /**
   * Methods.
   */

  _close = () => {
    this.image = null;
  };

  _submit = () => {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.image = null;
    }, 2000);
  };

  _onChange = aEvent => {
    const file = aEvent.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = mEvent => {
      this.image = mEvent.target.result;
    };
  };

  /**
   * Render.
   */

  render() {
    if (this.loading) return this._renderLoading();
    return this.image ? this._renderPreview() : this._renderPicker();
  }

  _renderPicker = () => {
    return (
      <div class="wrap">
        <input onChange={this._onChange} id="choose-photo-input" type="file" />
        <label for="choose-photo-input">
          <div
            class="camera"
            style={{ backgroundImage: `url(${CameraSVG})` }}
          />
          <app-touchable>
            <div class="btn hover-state">Choose Photo</div>
          </app-touchable>
        </label>
      </div>
    );
  };

  _renderPreview = () => {
    const backgroundImage = `url(${this.image})`;
    return (
      <div class="wrap">
        <div class="close" onClick={this._close} />
        <div class="preview" style={{ backgroundImage }} />
        <app-touchable onClick={this._submit}>
          <div class="btn confirm">Continue</div>
        </app-touchable>
      </div>
    );
  };

  _renderLoading = () => {
    return (
      <div class="wrap">
        <app-loader />
      </div>
    );
  };
}

customElements.define("choose-photo", ChoosePhoto);
