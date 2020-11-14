import "./styles/index.css";

import {
  MAIN_BY_PATH,
  MAIN_API_OPTIONS,
  NEWS_API_OPTIONS,
} from './js/config/index.js';


import {
  popupSignupDE, popupLoginDE, popupSuccessfulSignupDE,
  authButton, loginButton, registerButton, enterButton, userLogoutButton,
  popupAuthButton, popupRegisterButton,
  formSignup, formEnter, formSearch,
  emailInputSignup, passwordInputSignup, nameCheckSignup,
  emailLoginAuth, loginPasswordAuth,
} from './js/constants/constantsDomElements';

import VALIDATION_HINT_MESSAGES from "./js/constants/errors-messages";

import MainApi from './js/api/MainApi';
import NewsApi from './js/api/NewsApi';
import Popup from './js/components/Popup';
import FormValidator from './js/components/FormValidator';
import UserInfo from './js/components/UserInfo';
import RegUser from './js/components/RegUser';
import Header from './js/components/Header';
import Button from "./js/components/Button";

import Page from "./js/components/Page";
// //Instancies ======================================================>
const mainApi = new MainApi(MAIN_API_OPTIONS);
const newsApi = new NewsApi(NEWS_API_OPTIONS);

const formSignupValidator = new FormValidator(formSignup, VALIDATION_HINT_MESSAGES);
const formEnterValidator = new FormValidator(formEnter, VALIDATION_HINT_MESSAGES);

const popupSignup = new Popup(popupSignupDE);
const popupLogin = new Popup(popupLoginDE);

const authSignupButton = new Button(authButton);
authSignupButton.setEventListener('click', () => {
  formSignupValidator.clearErrors();
  formSignupValidator.setSubmitButtonState(false);
  popupSignup.open();
});
const regSigninButton = new Button(loginButton);
regSigninButton.setEventListener('click', () => {
  formEnterValidator.clearErrors();
  formEnterValidator.setSubmitButtonState(false);
  popupSignup.close();
  popupLogin.open();
})
const registrationButton = new Button(registerButton);
registrationButton.setEventListener('click', () => {
  formEnterValidator.clearErrors();
  formEnterValidator.setSubmitButtonState(false);
  popupLogin.close();
  popupSignup.open();
})

const mainHeader = new Header({
  api: mainApi,
  authButton: authButton,
  path: MAIN_BY_PATH,
  regUserButton: userLogoutButton,
});

// const mainPage = new Page(mainHeader, mainContent, mainFooter);



// document.addEventListener('DOMContentLoaded', () => {
//   makeHeader();
//   makeFooter();
//   initPopups();
//   setUpPopups();
// });

// setListeners() {
//   this.regSigninButton.addEventListener('click', this._userLogout);
//   this.authButton.addEventListener('click', () => {
//       this.validator.clearErrors();
//       this.validator.setSubmitButtonState(false);
//       this.popup.open();
//   });
// }






// //Instancies ======================================================>
// const instanceMainApi = new MainApi(MAIN_API_OPTIONS);
// const instanceNewsApi = new MainApi(NEWS_API_OPTIONS);
// const instancePopupSignup = new PopupSignup(popupSignup);
// const instancePopupLogin = new PopupLogin(popupLogin);
// const instancePopupSuccessfulSignup = new PopupSuccessfulSignup(popupSuccessfulSignup);
// const instanceUserInfo = new UserInfo(emailInputSignup, passwordInputSignup,
//   nameCheckSignup, instanceMainApi, instancePopupSuccessfulSignup);
// const instanceRegUser = new RegUser(emailLoginAuth, loginPasswordAuth,
//   instanceMainApi)
// const authSignupButton = new Button(authButton);
// const regSigninButton = new Button(enterButton);
// const handleSignupForm = instancePopupSignup.handleForm();
// const handleLoginForm = instancePopupLogin.handleForm();
// const formPopupSignupValidator = new FormValidator(handleSignupForm, VALIDATION_HINT_MESSAGES);
// const formPopupEnterValidator = new FormValidator(handleLoginForm, VALIDATION_HINT_MESSAGES);
// //===============================================================>

// //Section Header ================================================
// const header = new Header({instanceMainApi, authButton,
//   MAIN_BY_PATH, regSigninButton, validator: formPopupSignupValidator,
//   popup: instancePopupSignup, });

// header.setListeners();
// //header.render();

// loginButton.addEventListener('click', () => {
//   formPopupEnterValidator.clearErrors();
//   formPopupEnterValidator.setSubmitButtonState(false);
//   instancePopupSignup.close();
//   instancePopupLogin.open();
// });

// enterButton.addEventListener('click', () => {
//   formPopupEnterValidator.clearErrors();
//   formPopupEnterValidator.setSubmitButtonState(false);
//   instancePopupSignup.close();
//   instancePopupLogin.open();
// });

// enterButton.addEventListener('click', () => {
//   instancePopupSuccessfulSignup.close();
//   instancePopupLogin.open();
//   //toggleButtonSignup.hide();
//   //toggleButtonLogout.show();
// });



// const authUserForm = (event) => {
//   event.preventDefault();
//   if (formPopupSignupValidator.checkInputValidity()) {
//     instanceRegUser.entryUser({email: emailLoginAuth.value, password: loginPasswordAuth.value });
//     instancePopupLogin.close();
//   }
// };

// const signupUserForm = (event) => {
//   event.preventDefault();
//   if (formPopupSignupValidator.checkInputValidity()) {
//     instanceUserInfo.regUserInfo({email: emailInputSignup.value, password: passwordInputSignup.value, name: nameCheckSignup.value});
//     instancePopupSignup.close();
//   }
// };

//listener
// formSignup.addEventListener('submit', signupUserForm);
// formEnter.addEventListener('submit', authUserForm);