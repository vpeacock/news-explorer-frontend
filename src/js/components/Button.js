import BaseComponent from './BaseComponent';

export default class Button extends BaseComponent {
  constructor(props) {
    super(props);
    this.domElement = props.domElement;
  }

  enable() {
    this.domElement.classList.remove('button_state_inactive');
    this.domElement.removeAttribute('disabled');
  }

  disable() {
    this.domElement.classList.add('button_state_active:active');
    this.domElement.setAttribute('disabled', true);
  }

  show() {
    this.domElement.classList.remove('lists__item_is-invisible');
  }

  hide() {
    this.domElement.classList.add('lists__item_is-invisible');
  }

}



