export default class BaseComponent {
  constructor(domElement, visibleClass, invisibleClass) {
    this.domElement = domElement;
    this.visibleClass = visibleClass;
    this.invisibleClass = invisibleClass;
  }

  setEventListener = (...args) => {
    this.domElement.addEventListener(...args);
  }

  removeEventListener = (...args) => {
    this.domElement.removeEventListener(...args);
  }

  show = () => {
    this.domElement.classList.add(this.visibleClass);
  }

  hide = () => {
    this.domElement.classList.remove(this.visibleClass);
  }
}