import Popup from './Popup';

export default class PopupSuccess extends Popup {
  constructor(props) {
    super(props);
    this.page = props.page;
    this._popup = props.popup;
    this._link = this._popup.querySelector('.popup__text')
    this._openLinkPopup = props.openLinkPopup;
    this.buttonBurger = props.buttonBurger;
    this.popups = props.popups;
  }

  open = () => {
    this._popup.classList.add('popup_is-visible');
    this._setEventListeners();
  }

  close = () => {
    if(this.buttonBurger.classList.contains('button-burger_is-invisible') && this.isPopupOpen) {
      this.buttonBurger.classList.remove('button-burger_is-invisible')
    }
    this._close();
    this._removeEventListeners();
  }

  isPopupOpen = () => {
    return this.popups.every(popup => !popup.classList.contains('popup_is-invisible'))
  }

  _setEventListeners = () => {
    this._setListeners();
    this._link.addEventListener('click', this._changePopups)
  }

  _removeEventListeners = () => {
    this._removeListeners();
    this._link.removeEventListener('click', this._changePopups)
  }


  _changePopups = () => {
    this.close();
    this._openLinkPopup();
  }


}