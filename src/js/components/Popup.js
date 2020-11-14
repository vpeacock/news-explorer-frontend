import BaseComponent from "./BaseComponent";

export default class Popup extends BaseComponent {

  constructor(props) {
    super(props)
    this.popup = props.popup;

  }

  open = () => {
    this.clear();
    this.popup.classList.add('popup_is-visible');
    this.setEventListeners();
  }

  close = () => {
    this.popup.classList.remove('popup_is-visible');
    this.removeEventListeners();
  }

  clear = () => {
    let _form = this.popup.querySelector('.popup__form');
   let _inputs = [..._form.querySelectorAll('input')];
    _inputs.forEach((input) => {
      input.value = '';
    });
  }

  setEventListeners = () => {
    this.popup.querySelector('.popup__button-close').addEventListener('click', this.close);

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' || event.key === 'Esc') {
        this.close();
      }
    });

    this.popup.addEventListener('click', (event) => {
      if (event.target === this.popup && event.target !== this.popup.querySelector('.popup__content')) {
        this.close();
      }
    });
  }

  removeEventListeners = () => {
    this.popup.querySelector('.popup__button-close').removeEventListener('click', this.close);
    document.removeEventListener('keydown', (event) => {

      if (event.key === 'Escape' || event.key === 'Esc') {
        this.close();
      }
    });

    this.popup.removeEventListener('click', (event) => {
      if (event.target === this.popup && event.target !== this.popup.querySelector('.popup__content')) {
        this.close();
      }
    });
  }
}

