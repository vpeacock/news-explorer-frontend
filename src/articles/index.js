import "../styles/articles.css";

import {
  MAIN_BY_PATH,
  MAIN_API_OPTIONS,
} from '../js/config/index.js';


import {
  overlay, buttonBurger, authButton, userLogoutButton,
  itemUnath, itemsAuth, navMenuMobile, mobileMenuClose, articlesContainer,
  articlesMore, messagePreloader, messageNotFound, messageServerError, articlesSection,
  headerLogo, userName, blockKeywords, keywords, articlesCount
} from '../js/constants/constantsDomElements';


import MainApi from '../js/api/MainApi';
import Header from '../js/components/Header';
import MenuMobile from "../js/components/MenuMobile";
import Articles from "../js/components/Articles";
import ArticlesList from "../js/components/ArticlesList";
import InfoBlock from "../js/components/InfoBlock";

import Page from "../js/components/Page";
(function () {
  //Functions library?======================================================>

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
    return new Articles(props).renderSaveArticles();
  }


  const clearArticlesList = () => {
    instArticlesList.clear();
  }

  //Instancies ======================================================>
  const mainApi = new MainApi({ options: MAIN_API_OPTIONS });

  const instPage = new Page({
    serverError: messageServerError,
    messageNotFound: messageNotFound,
    articlesSection: articlesSection,
    preloader: messagePreloader,
    button: articlesMore,
    renderArticles: renderArticles,
    clearArticlesList: clearArticlesList,
    api: mainApi,
    path: MAIN_BY_PATH,
  })


  const instHeader = new Header({
    api: mainApi,
    authButton: authButton,
    logoutButton: userLogoutButton,
    itemUnath: itemUnath,
    itemsAuth: itemsAuth,
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

  const instInfoBlock = new InfoBlock({
    userNameDE: userName,
    blockKeywordsDE: blockKeywords,
    keywordsDE: keywords,
    articlesCountDE: articlesCount,

  })

  buttonBurger.addEventListener('click', () => {
    instMenuMobile.open()
  });

  const isAuth = () => {
    sessionStorage.articles = [];
    Promise.all([instPage.getArticles(), instHeader.render()])
      .then(() => {
        instInfoBlock.render();
      })
      .catch((err) => {
        console.log(err)
      })
  }
  isAuth()

})()