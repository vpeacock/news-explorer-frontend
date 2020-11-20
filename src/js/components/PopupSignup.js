import Popup from './Popup';

export default class PopupSignup extends Popup {
  constructor(props) {
    super(props);
    this._popup = props.popup;
    this._api = props.api;
    this._serverError = this._popup.querySelector('.error-message_center');
    this._openLinkPopup = props.openLinkPopup;
    this._openSuccess = props.openSuccessPopup;
    this.buttonBurger = props.buttonBurger;
    this.popups = props.popups;
    //  this._popupSuccess = props.popupSuccess;
    this.VALIDATION_HINT_MESSAGES = props.messages;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = [...this._form.querySelectorAll('input')];
    this._emailInput = this._form.querySelector('#email-signup');
    this._passwordInput = this._form.querySelector('#login-password-signup');
    this._nameCheck = this._form.querySelector('#name-check-signup');
    this._buttonSubmit = this._form.querySelector('.button');
    this._link = this._form.querySelector('#login');
    this.userInfo = {};
  }



  _signupUserForm = (event) => {
    event.preventDefault();
      if (this._checkInputValidity()) {
        this._regUserInfo({
        email: this._emailInput.value,
        password: this._passwordInput.value,
        name: this._nameCheck.value
      });
      // this.close();
      // this._popupSuccess.open();
    }
  };

  _regUserInfo = (data) => {
    console.log(data);
    this.userInfo = data;
    this._api.signup(this.userInfo)
      .then((data) => {
        console.log(data);
        this.close();
        this._openSuccess();
      })
      .catch((err) => {
        this._serverError.textContent = err.message
        console.log(err.message);
      });
  }

  _checkInputValidity = () => {
    let valid = true;
    this._inputs.forEach((input) => {
      if (input.type !== 'button') {
        if (!this._isFieldValid(input)) valid = false;
      }
    });
    return valid;
  };

  _isValidate = (input) => {
    input.setCustomValidity('');
    if (input.validity.valueMissing) {
      input.setCustomValidity(this.VALIDATION_HINT_MESSAGES.requiredField);
      return false;
    }

    if (input.name === 'email' && input.validity.patternMismatch) {
      input.setCustomValidity(this.VALIDATION_HINT_MESSAGES.InvalidEmail);
      return false;
    }

    if (input.validity.tooShort || input.validity.tooLong) {
      if (input.type === 'text') {
        input.setCustomValidity(this.VALIDATION_HINT_MESSAGES.NameLengthError);
        return false;
      }
      else if (input.name === 'password') {
        input.setCustomValidity(this.VALIDATION_HINT_MESSAGES.PasswordLengthError);
        return false;
      }

    }
    return input.checkValidity();
  };

  _isFieldValid = (input) => {
    const errorElem = input.parentNode.querySelector(`#error-${input.id}`);
    const valid = this._isValidate(input);

    if (errorElem !== null) {
      errorElem.textContent = input.validationMessage;
    }
    return valid;
  };

  _clearErrors = () => {
    const errors = this._form.querySelectorAll('.error-message');
    errors.forEach((item) => {
      item.textContent = '';
    });
  }

  _setSubmitButtonState = (state) => {
    if (state) {
      this._buttonSubmit.removeAttribute('disabled');
      this._buttonSubmit.classList.add('button_state_active:active');
      this._buttonSubmit.classList.remove('button_state_inactive');
    } else {
      this._buttonSubmit.setAttribute('disabled', true);
      this._buttonSubmit.classList.add('button_state_inactive');
      this._buttonSubmit.classList.remove('button_state_active:active');
    }
  };

  _handlerInputForm = (event) => {
    this._isFieldValid(event.target);
    if (this._inputs.every(this._isValidate)) {
      this._setSubmitButtonState(true);
    } else {
      this._setSubmitButtonState(false);
    }
  };

  open = () => {
    this._clearErrors()
    this._setSubmitButtonState(false);
    this._open();
    this._setEventListeners();
  }

  close = (flag) => {
    if(this.buttonBurger.classList.contains('button-burger_is-invisible') && flag) {
      this.buttonBurger.classList.remove('button-burger_is-invisible')
    }
    this._close();
    this._removeEventListeners();
  }

  isPopupOpen = () => {
    return this.popups.every(popup => popup.classList.contains('popup_is-invisible'))
  }

  _setEventListeners = () => {
    this._setListeners();
    this._inputs.forEach((input) => {
      input.addEventListener('input', this._handlerInputForm, true);
      input.addEventListener('blur', this._handlerInputForm, true);
    });
    this._form.addEventListener('submit', this._signupUserForm);
    this._link.addEventListener('click', this._changePopups)
  }

  _removeEventListeners = () => {
    this._removeListeners();
    this._inputs.forEach((input) => {
      input.removeEventListener('input', this._handlerInputForm, true);
      input.removeEventListener('blur', this._handlerInputForm, true);
    });
    this._form.removeEventListener('submit', this._signupUserForm);
    this._link.removeEventListener('click', this._changePopups)
  }

  _changePopups = () => {
    this.close(false);
    this._openLinkPopup();
  }


}