import "./styles/index.css";

import {
  MAIN_BY_PATH,
  MAIN_API_OPTIONS,
  NEWS_API_OPTIONS,
} from './js/config/index.js';


import {
  popupSignupDE, popupLoginDE, popupSuccessfulSignupDE,
  authButton, loginLink, registerLink, enterButtonDE, userLogoutButton,
  itemUnath, itemsAuth,
  popupAuthButton, popupRegisterButton,
  formSignup, formEnter, formSearch,
  emailInputSignup, passwordInputSignup, nameCheckSignup,
  emailLoginAuth, loginPasswordAuth,
  overlay, buttonBurger, page, nav, buttonCloseMenu, popupButtonClose,
  overlayPopup,
  navMain, navArticles, navAuthorization, navUserName, buttonIcon,
  navMenuMobile, mobileMenuClose, popups
} from './js/constants/constantsDomElements';

import VALIDATION_HINT_MESSAGES from "./js/constants/errors-messages";

import MainApi from './js/api/MainApi';
import NewsApi from './js/api/NewsApi';
import FormValidator from './js/components/FormValidator';
import UserInfo from './js/components/UserInfo';
import RegUser from './js/components/RegUser';
import Header from './js/components/Header';
import Button from "./js/components/Button";
import PopupSignup from "./js/components/PopupSignup";
import PopupSuccess from "./js/components/PopupSuccess";
import PopupLogin from "./js/components/PopupLogin";
import MenuMobile from "./js/components/MenuMobile";
import Search from "./js/components/Search";

import Page from "./js/components/Page";
(function () {
  //Functions library?======================================================>
  const openPopupLogin = () => {
    instPopupLog.open();
  }

  const openPopupSignup = () => {
    instPopupSignup.open();
  }

  const openPopupSuccess = () => {
    instPopupSuccess.open();
  }

  const renderHeader = () => {
    instHeader.render();
  }

  const closeMenuMobile = () => {
    instMenuMobile.close();
  }

  //Instancies ======================================================>
  const mainApi = new MainApi({options: MAIN_API_OPTIONS});
  const newsApi = new NewsApi({options: NEWS_API_OPTIONS});

  //const formSignupValidator = new FormValidator(formSignup, VALIDATION_HINT_MESSAGES);
  // const formEnterValidator = new FormValidator(formEnter, VALIDATION_HINT_MESSAGES);

  const instPopupSuccess = new PopupSuccess({
    popup: popupSuccessfulSignupDE,
    // popupLogin: instancePopupLog,
    openLinkPopup: openPopupLogin,
    buttonBurger: buttonBurger,
    popups: popups,
  });

  const instPopupLog = new PopupLogin({
    popup: popupLoginDE,
    api: mainApi,
    renderHeader: renderHeader,
    messages: VALIDATION_HINT_MESSAGES,
    button: userLogoutButton,
    openLinkPopup: openPopupSignup,
    menu: navMenuMobile,
    closeMenuMobile: closeMenuMobile,
    buttonBurger: buttonBurger,
    popups: popups,

  });

  const instPopupSignup = new PopupSignup({
    popup: popupSignupDE,
    api: mainApi,
    // popupLogin: instPopupLog,
    // popupSuccess: instPopupSuccess,
    // linkPopup: instPopupSuccess,
    messages: VALIDATION_HINT_MESSAGES,
    openLinkPopup: openPopupLogin,
    openSuccessPopup: openPopupSuccess,
    buttonBurger: buttonBurger,
    popups: popups,
  });

  const instHeader = new Header({
    api: mainApi,
    authButton: authButton,
    logoutButton: userLogoutButton,
    itemUnath: itemUnath,
    itemsAuth: itemsAuth,
    instPopupLog: instPopupLog,
    path: MAIN_BY_PATH,


  })

  const instMenuMobile = new MenuMobile({
    menu: navMenuMobile,
    buttonBurger: buttonBurger,
    buttonClose: mobileMenuClose,

  })

  const instSearchForm = new Search({
    form: formSearch,
    api: newsApi,
  })

  // const instUserInfo = new UserInfo({
  //   email: emailInputSignup,
  //   password: passwordInputSignup,
  //   name: nameCheckSignup,
  //   api: mainApi,
  //   popup: instPopupSuccess,
  // });




  // const instRegUser = new RegUser({
  //   email: emailLoginAuth,
  //   password: loginPasswordAuth,
  //   name: userLogoutButton,
  //   api: mainApi,
  // });


  const authSignupButton = new Button({
    domElement: authButton,
  });

  const regSigninButton = new Button({ domElement: loginLink });
  const registrationButton = new Button({ domElement: registerLink });
  const userButton = new Button({ domElement: userLogoutButton });
  const enterButton = new Button({ domElement: enterButtonDE });

  //-----------------------------------------------------------------------------------------------------
  // navAuthorization.classList.add('lists__item_is-invisible');
  // userLogoutButton.textContent = 'abrakadabra'
  // navUserName.classList.remove('lists__item_is-invisible');
  //-----------------------------------------------------------------------------------------------------

  // buttonBurger.classList.add('button-burger_is-invisible');
  // navMenuMobile.classList.add('nav_is-visible')
  // mobileMenuClose.classList.add('button-close_is-visible')




  // regSigninButton.setEventListener('click', () => {
  //   // formEnterValidator.clearErrors();
  //   // formEnterValidator.setSubmitButtonState(false);
  //   instPopupLogin.open();
  //   instPopupSignup.close();
  // });

  // registrationButton.setEventListener('click', () => {
  //   // formSignupValidator.clearErrors();
  //  //formSignupValidator.setSubmitButtonState(false);
  //   instPopupLogin.close();
  //   instPopupSignup.open();
  // });

  // enterButton.setEventListener('click', () => {
  //   // formEnterValidator.clearErrors();
  //   // formEnterValidator.setSubmitButtonState(false);
  //   instPopupSuccess.close();
  //   instPopupLogin.open();
  // });

  // const signupUserForm = (event) => {
  //   event.preventDefault();
  //   if (formSignupValidator.checkInputValidity()) {
  //     instUserInfo.regUserInfo({
  //       email: emailInputSignup.value,
  //       password: passwordInputSignup.value,
  //       name: nameCheckSignup.value
  //     });
  //     instPopupSignup.close();
  //     instPopupSuccess.open();
  //   }
  // };

  // const authUserForm = (event) => {
  //   event.preventDefault();
  //   if (formEnterValidator.checkInputValidity()) {
  //     instRegUser.entryUser({
  //       email: emailLoginAuth.value,
  //       password: loginPasswordAuth.value

  //     });
  //     instPopupLogin.close();
  //     authSignupButton.hide();

  //   }
  // };


  // formSignup.addEventListener('submit', signupUserForm);
  // formEnter.addEventListener('submit', authUserForm);
  buttonBurger.addEventListener('click', () => {
    instMenuMobile.open()
  });
    instHeader.render();
    instSearchForm.setEventListener();


  })()