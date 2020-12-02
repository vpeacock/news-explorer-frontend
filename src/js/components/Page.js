import { COUNT_NEWS } from "../constants/constants";

export default class Page {
  constructor(props) {
    this.errorMessage = props.serverError;
    this.notFound = props.messageNotFound;
    this.articlesSection = props.articlesSection;
    this.renderArticles = props.renderArticles;
    this.clearArticlesList = props.clearArticlesList,
    this.preloader = props.preloader;
    this.button = props.button;
    this.page = document.querySelector('.page');
    this.api = props.api;
    this.mainPath = props.path;

  }

  showSection = (section) => {
    section.classList.remove('message_is-invisible');
  }

  showButton = () => {
    this.button.classList.remove('button_is-invisible');
  }

  hideButton = () => {
    if (!this.button.classList.contains('button_is-invisible')) {
      this.button.classList.add('button_is-invisible');
    }
  }

  hideSection = (section) => {
    section.classList.add('message_is-invisible');
  }

  disableScroll = () => {
    this.page.classList.add('page_no-scroll');
  }

  enableScroll = () => {
    this.page.classList.remove('page_no-scroll');
  }

  hideSections = () => {
    const sections = [...this.page.querySelectorAll('.message')];
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
      this.showSection(this.notFound)
      return
    }
    this.showSection(this.articlesSection);
    if (window.location.pathname === this.mainPath && length > 3) {
      this.showButton();
      this.button.addEventListener('click', this.slicingArray)
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

    if (window.location.pathname === this.mainPath) {
      this.slicingArray();
      return
    } this.renderArticles(this.articles)

  }

  slicingArray = () => {
    if (Object.keys(this.articles).length !== 0) {
      const blockArticles = this.articles.splice(0, COUNT_NEWS);
      this.renderArticles(blockArticles, this.keyword);
      if (this.articles.length === 0) {
        this.button.removeEventListener('click', this.slicingArray)
        this.hideButton();
      }
    }
  }

  getArticles = () => {
    return this.api.getArticles()
      .then((res) => {
        this.processingResults(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })

  }

}