import "./styles/index.css";

import {
  MAIN_BY_PATH,
  MAIN_API_OPTIONS,
  NEWS_API_OPTIONS,
} from './js/config/index.js';


import {
  popupSignupDE, popupLoginDE, popupSuccessfulSignupDE,
  authButton, loginLink, registerLink, enterButton, userLogoutButton,
  popupAuthButton, popupRegisterButton,
  formSignup, formEnter, formSearch,
  emailInputSignup, passwordInputSignup, nameCheckSignup,
  emailLoginAuth, loginPasswordAuth,
  overlay, buttonBurger, page, nav, buttonCloseMenu, popupButtonClose,
  overlayPopup,
} from './js/constants/constantsDomElements';

import VALIDATION_HINT_MESSAGES from "./js/constants/errors-messages";

import MainApi from './js/api/MainApi';
import NewsApi from './js/api/NewsApi';
// import Popup from './js/components/Popup';
import FormValidator from './js/components/FormValidator';
import UserInfo from './js/components/UserInfo';
import RegUser from './js/components/RegUser';
import Header from './js/components/Header';
import Button from "./js/components/Button";
import PopupSignup from "./js/components/PopupSignup";
import PopupSuccess from "./js/components/PopupSuccess";
import PopupLogin from "./js/components/PopupLogin";

import Page from "./js/components/Page";
(function () {
  //Functions library?======================================================>

  const togglePopup = (p1, p2, fv) => {
    fv.clearErrors();
    fv.setSubmitButtonState(false);
    p1.close();
    p2.open();
  }

  //Instancies ======================================================>
  const mainApi = new MainApi(MAIN_API_OPTIONS);
  const newsApi = new NewsApi(NEWS_API_OPTIONS);

  const formSignupValidator = new FormValidator(formSignup, VALIDATION_HINT_MESSAGES);
  const formEnterValidator = new FormValidator(formEnter, VALIDATION_HINT_MESSAGES);

  const instancePopupSignup = new PopupSignup({ popup: popupSignupDE });
  const instancePopupSuccess = new PopupSuccess({ popup: popupSuccessfulSignupDE });
 //const instancePopupLogin = new PopupLogin({ popup: popupLoginDE });


  const instanceUserInfo = new UserInfo({
    email: emailInputSignup,
    password: passwordInputSignup,
    name: nameCheckSignup,
    api: mainApi,
    popup: instancePopupSuccess,
  });

  const authSignupButton = new Button(authButton);
  // const regSigninButton = new Button(enterButton);
 // const regSigninButton = new Button(loginLink);

  authSignupButton.setEventListener('click', () => {
    formSignupValidator.clearErrors();
    formSignupValidator.setSubmitButtonState(false);
    instancePopupSignup.open();
  });


  // regSigninButton.setEventListener('click', () => {
  //   formEnterValidator.clearErrors();
  //   formEnterValidator.setSubmitButtonState(false);
  //   instancePopupSignup.close();
  //   instancePopupLogin.open();
  // })



  const signupUserForm = (event) => {
    event.preventDefault();
    if (formSignupValidator.checkInputValidity()) {
      instanceUserInfo.regUserInfo({
        email: emailInputSignup.value,
        password: passwordInputSignup.value,
        name: nameCheckSignup.value
      });
      instancePopupSignup.close();
    }
  };


  formSignup.addEventListener('submit', signupUserForm);
  // formEnter.addEventListener('submit', authUserForm);


  // const regSigninButton = new Button(loginButton);
  // regSigninButton.setEventListener('click', () => {
  //   formEnterValidator.clearErrors();
  //   formEnterValidator.setSubmitButtonState(false);
  //   popupSignup.close();
  //   popupLogin.open();
  // })
  // const registrationButton = new Button(registerButton);
  // registrationButton.setEventListener('click', () => {
  //   formEnterValidator.clearErrors();
  //   formEnterValidator.setSubmitButtonState(false);
  //   popupLogin.close();
  //   popupSignup.open();
  // })

  // const mainHeader = new Header({
  //   api: mainApi,
  //   authButton: authButton,
  //   path: MAIN_BY_PATH,
  //   regUserButton: userLogoutButton,
  // });

  // const mainPage = new Page(mainHeader, mainContent, mainFooter);

  // document.addEventListener('DOMContentLoaded', () => {
  //   makeHeader();
  //   makeFooter();
  //   initPopups();
  //   setUpPopups();
  // });


})()




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

// })();