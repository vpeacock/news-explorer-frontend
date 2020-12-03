import "./styles/index.css";

import {
  MAIN_BY_PATH,
  MAIN_API_OPTIONS,
  NEWS_API_OPTIONS,
} from './js/config/index.js';


import {
  popupSignupDE, popupLoginDE, popupSuccessfulSignupDE, formSearch, overlay,
  buttonBurger, authButton, userLogoutButton, itemUnath, itemsAuth, navMenuMobile,
  mobileMenuClose, popups, articlesContainer, articlesMore,
   messagePreloader, messageNotFound, messageServerError, articlesSection,
  headerLogo
} from './js/constants/constantsDomElements';

import VALIDATION_HINT_MESSAGES from "./js/constants/errors-messages";

import MainApi from './js/api/MainApi';
import NewsApi from './js/api/NewsApi';
import Header from './js/components/Header';
import PopupSignup from "./js/components/PopupSignup";
import PopupSuccess from "./js/components/PopupSuccess";
import PopupLogin from "./js/components/PopupLogin";
import MenuMobile from "./js/components/MenuMobile";
import Articles from "./js/components/Articles";
import ArticlesList from "./js/components/ArticlesList";
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

  const renderArticles = (articles, keyword) => {
    instArticlesList.render(articles, keyword);

  }

  const cbCreateCard = (props) => {
    return new Articles(props).render();
  }


  const clearArticlesList = () => {
    instArticlesList.clear();
  }

  //Instancies ======================================================>
  const mainApi = new MainApi({ options: MAIN_API_OPTIONS });
  const newsApi = new NewsApi({ options: NEWS_API_OPTIONS });

  const instPage = new Page({
    serverError: messageServerError,
    messageNotFound: messageNotFound,
    articlesSection: articlesSection,
    preloader: messagePreloader,
    button: articlesMore,
    renderArticles: renderArticles,
    clearArticlesList: clearArticlesList,
    path: MAIN_BY_PATH,
  })

  const instPopupSuccess = new PopupSuccess({
    popup: popupSuccessfulSignupDE,
    openLinkPopup: openPopupLogin,
    buttonBurger: buttonBurger,
    popups: popups,
    page: instPage,
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
    renderArticles: renderArticles,
    page: instPage,
    clearArticlesList: clearArticlesList,

  });

  const instPopupSignup = new PopupSignup({
    popup: popupSignupDE,
    api: mainApi,
    messages: VALIDATION_HINT_MESSAGES,
    openLinkPopup: openPopupLogin,
    openSuccessPopup: openPopupSuccess,
    buttonBurger: buttonBurger,
    popups: popups,
    page: instPage,
  });


  const instHeader = new Header({
    api: mainApi,
    authButton: authButton,
    logoutButton: userLogoutButton,
    itemUnath: itemUnath,
    itemsAuth: itemsAuth,
    instPopupLog: instPopupLog,
    path: MAIN_BY_PATH,
    page: instPage,
    clearArticlesList: clearArticlesList,
  })

  const instMenuMobile = new MenuMobile({
    menu: navMenuMobile,
    buttonBurger: buttonBurger,
    buttonClose: mobileMenuClose,
    page: instPage,
    overlay: overlay,
    path: MAIN_BY_PATH,
    logo: headerLogo,
  })

  const instArticlesList = new ArticlesList({
    cbCreateCard: cbCreateCard,
    container: articlesContainer,
    api: mainApi,
    path: MAIN_BY_PATH,
  })

  const instSearchForm = new Search({
    form: formSearch,
    api: newsApi,
    instPage: instPage,
    serverError: messageServerError,
    messageNotFound: messageNotFound,
    articlesSection: articlesSection,
    preloader: messagePreloader,
    clearArticlesList: clearArticlesList,
  })

   buttonBurger.addEventListener('click', () => {
    instMenuMobile.open()
  });


  instHeader.render();
  instSearchForm.setEventListener();

})()