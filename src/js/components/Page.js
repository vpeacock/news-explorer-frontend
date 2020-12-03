import { COUNT_NEWS } from "../constants/constants";

export default class Page {
  constructor(props) {
    this._errorMessage = props.serverError;
    this._notFound = props.messageNotFound;
    this._articlesSection = props.articlesSection;
    this._renderArticles = props.renderArticles;
    this._clearArticlesList = props.clearArticlesList,
    this._preloader = props.preloader;
    this._button = props.button;
    this._page = document.querySelector('.page');
    this._api = props.api;
    this._mainPath = props.path;

  }

  showSection = (section) => {
    section.classList.remove('message_is-invisible');
  }

  showButton = () => {
    this._button.classList.remove('button_is-invisible');
  }

  hideButton = () => {
    if (!this._button.classList.contains('button_is-invisible')) {
      this._button.classList.add('button_is-invisible');
    }
  }

  hideSection = (section) => {
    section.classList.add('message_is-invisible');
  }

  disableScroll = () => {
    this._page.classList.add('page_no-scroll');
  }

  enableScroll = () => {
    this._page.classList.remove('page_no-scroll');
  }

  hideSections = () => {
    const sections = [...this._page.querySelectorAll('.message')];
    sections.forEach((section) => {
      if (section.classList.contains('message_is-invisible')) {
        return
      }
      this.hideSection(section);
    });
  }

  processingResults = (articles, keyword) => {
    const length = articles.length;
    sessionStorage.articles = JSON.stringify(articles);
    if (keyword) {
      sessionStorage.keyword = JSON.stringify(keyword);
    }
    if (length === 0) {
      this.showSection(this._notFound)
      return
    }
    this.showSection(this._articlesSection);
    if (window.location.pathname === this._mainPath && length > 3) {
      this.showButton();
      this._button.addEventListener('click', this._slicingArray)
    }
    this.setArticleData(articles);
  }

  setArticleData = (articles) => {
    if (!articles) {
      return
    } this.articles = articles;

    const keyword = sessionStorage.keyword;
    if (keyword) {
      this.keyword = JSON.parse(keyword).keyword;
    }

    if (window.location.pathname === this._mainPath) {
      this._slicingArray();
      return
    } this._renderArticles(this.articles)

  }

  _slicingArray = () => {
    if (Object.keys(this.articles).length !== 0) {
      const blockArticles = this.articles.splice(0, COUNT_NEWS);
      this._renderArticles(blockArticles, this.keyword);
      if (this.articles.length === 0) {
        this._button.removeEventListener('click', this._slicingArray)
        this.hideButton();
      }
    }
  }

  getArticles = () => {
    return this._api.getArticles()
      .then((res) => {
        this.processingResults(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })

  }

}