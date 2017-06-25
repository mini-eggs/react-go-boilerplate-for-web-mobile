import { Component, h } from "skatejs";
import CameraSVG from "../assets/camera.svg";
import Styles from "./choosePhoto.styles.js";
import("./loader");
import("./touchable");
const React = { createElement: h };

class ChoosePhoto extends Component {
  static get props() {
    return {
      image: null,
      loading: false
    };
  }

  _close = () => {
    this.image = null;
  };

  _submit = () => {
    console.log(1);
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.image = null;
    }, 2000);
  };

  renderCallback() {
    return (
      <div class="choose-photo">
        <style>{Styles}</style>
        {this.loading
          ? this._renderLoading()
          : this.image ? this._renderPreview() : this._renderPicker()}
      </div>
    );
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

  _onChange = aEvent => {
    const file = aEvent.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = mEvent => {
      this.image = mEvent.target.result;
    };
  };
}

customElements.define("choose-photo", ChoosePhoto);
