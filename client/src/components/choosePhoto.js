import { Component } from "../lib/";
import CameraSVG from "../assets/camera.svg";

const containerSize = 200;

const styles = `
  div.choose-photo {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .wrap {
    position: relative;
    display: flex;
    flex: 1;
    width: ${containerSize}px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  div input {
    width: ${containerSize}px;
    opacity: 0;
    height: 0;
    text-align: center;
    display: block;
  }
  div label {
    display: block;
    width: 100%;
    width: ${containerSize}px;
    text-align: center;
    cursor: pointer;
  }
  .camera {
    padding: 0 25px;
    width: 150px;
  }
  .preview {
    width: 150px;
    height: 150px;
    background-size: cover;
    background-position: center center;
    margin: 0 auto;
    border-radius: 50%;
  }
  .btn {
    text-align: center;
    cursor: pointer;
    width: 100%;
    margin-top: 25px;
    border-radius: 3px;
    background-color: lightblue;
    color: white;
    padding: 10px 0;
    font-size: 18px;
  }
  * {
    outline: none !important;
  }
  .close {
    position: absolute;
    top: -20px;
    right: -20px;
    font-size: 40px;
    cursor: pointer;
  }
  .close:after {
    content: "×";
  }
`;

const markup = `
  <div class="choose-photo">
    <div class="wrap">
      <input id="choose-photo-input" type="file" />
        <label for="choose-photo-input">
        <img class="camera" src="${CameraSVG}" />
        <div class="btn">Choose Photo</div>
      </label>
    </div>
  </div>
`;

class ChoosePhoto extends Component {
  state = { image: null };

  connectedCallback() {
    this.initial();
  }

  disconnectedCallback() {
    this.find("input").removeEventListener("change", this.handleImage);
    this.find(".confirm").removeEventListener("click", this.submit);
  }

  events() {
    this.find("input").addEventListener("change", this.handleImage);
  }

  handleImage = aEvent => {
    const file = aEvent.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = mEvent => {
      this.state.image = mEvent.target.result;
      this.updateDOM();
    };
  };

  updateDOM() {
    const { image } = this.state;
    this.find(".wrap").innerHTML = `
      <div class="close"></div>
      <div class="preview" style="background-image: url(${image});"></div>
      <div class="btn confirm">Continue</div>
    `;
    this.find(".confirm").addEventListener("click", this.submit);
    this.find(".close").addEventListener("click", this.initial);
  }

  submit = () => {
    // send request
    this.showLoading();
    setTimeout(() => {
      this.initial();
    }, 2000);
  };

  showLoading() {
    import("./loader");
    const container = this.shadow.querySelector(".wrap");
    container.innerHTML = `
      <app-loader><app-loader>
    `;
  }

  initial = () => {
    this.shadow.innerHTML = `
      <style>
        ${styles}
      </style>
      ${markup}
    `;
    this.events();
  };
}

customElements.define("choose-photo", ChoosePhoto);
