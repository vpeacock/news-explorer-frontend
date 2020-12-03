import Popup from './Popup';

export default class PopupSuccess extends Popup {
  constructor(props) {
    super(props);
    this._page = props.page;
    this._popup = props.popup;
    this._link = this._popup.querySelector('.popup__text')
    this._openLinkPopup = props.openLinkPopup;
    this._buttonBurger = props.buttonBurger;
    this._popups = props.popups;
  }

  open = () => {
    this._popup.classList.add('popup_is-visible');
    this._setEventListeners();
  }

  close = () => {
    if(this._buttonBurger.classList.contains('button-burger_is-invisible') && this._isPopupOpen) {
      this._buttonBurger.classList.remove('button-burger_is-invisible')
    }
    this._close();
    this._removeEventListeners();
  }

  _isPopupOpen = () => {
    return this._popups.every(popup => !popup.classList.contains('popup_is-invisible'))
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