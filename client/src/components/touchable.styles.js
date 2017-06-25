export default `
  div {
    position: relative;
    transition-duration: 250ms;
    cursor: pointer;
  }
  div:after {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0);
    transition-duration: 250ms;
  }
  div:hover:after {
    background-color: rgba(255, 255, 255, 0.25);
  }
  div:active {
    transform: scale(0.99);
  }
`;
