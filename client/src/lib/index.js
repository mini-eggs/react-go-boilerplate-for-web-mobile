const mock = {
  addEventListener: () => {},
  removeEventListener: () => {}
};

export class Component extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  find(selector) {
    const el = this.shadow.querySelector(selector);
    return el || mock;
  }

  findAll(selector) {
    const el = this.shadow.querySelectorAll(selector);
    return el || [mock];
  }
}
