export default class BaseComponent {
  constructor(domElement) {
    this.domElement = domElement;
  }

  setEventListener = (...args) => {
    this.domElement.addEventListener(...args);
  }

  removeEventListener = (...args) => {
    this.domElement.removeEventListener(...args);
  }

  show = () => {
    this.domElement.classList.remove('lists__item_is-invisible');
  }

  hide = () => {
    this.domElement.classList.add('lists__item_is-invisible');
  }
}