import BaseComponent from "./BaseComponent";

export default class Popup extends BaseComponent {

  constructor(props) {
    super(props)
    this._popup = props.popup;
    this.page = props.page;
    // this._linkPopup = props.linkPopup;
  }

  _open = () => {
    // this._clear();
    this._popup.classList.add('popup_is-visible');
    this._setEventListeners();
    this.page.disableScroll();
  }

  _close = () => {
    this._popup.classList.remove('popup_is-visible');
    this._removeEventListeners();
    this.page.enableScroll();
  }

  // _clear = () => {
  //   let _form = this._popup.querySelector('.popup__form');
  //  let _inputs = [..._form.querySelectorAll('.input')];
  //   _inputs.forEach((input) => {
  //     input.value = '';
  //   });
  // }

  _setListeners = () => {
    this._popup.querySelector('.popup__button-close').addEventListener('click', this.close);

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' || event.key === 'Esc') {
        this.close();
      }
    });

    this._popup.addEventListener('click', (event) => {
      if (event.target === this._popup && event.target !== this._popup.querySelector('.popup__content')) {
        this.close();
      }
    });
  }

  _removeListeners = () => {
    this._popup.querySelector('.popup__button-close').removeEventListener('click', this.close);
    document.removeEventListener('keydown', (event) => {

      if (event.key === 'Escape' || event.key === 'Esc') {
        this.close();
      }
    });

    this._popup.removeEventListener('click', (event) => {
      if (event.target === this._popup && event.target !== this._popup.querySelector('.popup__content')) {
        this.close();
      }
    });
  }


}

