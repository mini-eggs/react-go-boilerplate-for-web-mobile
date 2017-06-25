const containerSize = 200;
const imageDimensions = 150;

export default `
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
    align-items: stretch;
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
    width: ${imageDimensions}px;
    height: ${imageDimensions}px;
    background-size: 65%;
    background-position: center center;
    background-repeat: no-repeat;
    margin: 0 auto;
    border-radius: 50%;
    border: solid 4px black;
  }
  .preview {
    width: ${imageDimensions}px;
    height: ${imageDimensions}px;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    margin: 0 auto;
    border-radius: 50%;
    border: solid 4px black;
  }
  .btn {
    text-align: center;
    cursor: pointer;
    width: 100%;
    margin-top: 35px;
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
    top: -16px;
    right: 0;
    font-size: 40px;
    cursor: pointer;
  }
  .close:after {
    content: "×";
  }
`;
