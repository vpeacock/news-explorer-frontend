export default class FormValidator {
  constructor(form, messages) {
    this.form = form;
    this.VALIDATION_HINT_MESSAGES = messages;
    this.inputs = [...this.form.querySelectorAll('input')];
    this.buttonSubmit = this.form.querySelector('.button');
    this.checkInputValidity = this.checkInputValidity.bind(this);
    this.handlerInputForm = this.handlerInputForm.bind(this);
    this.isValidate = this.isValidate.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
    this.setEventListeners();
  }

  checkInputValidity() {
    let valid = true;
    this.inputs.forEach((input) => {
      if (input.type !== 'button') {
        if (!this.isFieldValid(input)) valid = false;
      }
    });
    return valid;
  };

  isValidate(input) {
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
  
  isFieldValid(input) {
    const errorElem = input.parentNode.querySelector(`#error-${input.id}`);
    const valid = this.isValidate(input);

    if (errorElem !== null) {
      errorElem.textContent = input.validationMessage;
    }
    return valid;
  };

  clearErrors() {
    const errors = this.form.querySelectorAll('.error-message');
    errors.forEach((item) => {
      item.textContent = '';
    });
  }

  setSubmitButtonState(state) {
    if (state) {
      this.buttonSubmit.removeAttribute('disabled');
      this.buttonSubmit.classList.add('button_state_active:active');
      this.buttonSubmit.classList.remove('button_state_inactive');
    } else {
      this.buttonSubmit.setAttribute('disabled', true);
      this.buttonSubmit.classList.add('button_state_inactive');
      this.buttonSubmit.classList.remove('button_state_active:active');
    }
  };

  handlerInputForm(event) {
    this.isFieldValid(event.target);
    if (this.inputs.every(this.isValidate)) {
      this.setSubmitButtonState(true);
    } else {
      this.setSubmitButtonState(false);
    }
  };

  setEventListeners() {
    this.inputs.forEach((input) => {
      input.addEventListener('input', this.handlerInputForm, true);
      input.addEventListener('blur', this.handlerInputForm, true);
    });
  }
}

