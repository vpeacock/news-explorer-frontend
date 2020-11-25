export default class Search {
  constructor(props) {
    this.form = props.form;
    this.input = this.form.querySelector('.search__input');
    this.errorMessage = this.form.querySelector('.error-message');
    this.button = this.form.querySelector('.button');
    this._api = props.api;
    this.renderArticles = props.renderArticles;
    this.page = props.instPage,
    this.errorMessage = props.serverError;
    this.notFound = props.messageNotFound;
    this.articlesSection = props.articlesSection;
    this.preloader = props.preloader;
    this.buttomMore = props.buttomMore;
    this.clearArticlesList = props.clearArticlesList;
  }

  _searchArticles = (event) => {
    event.preventDefault();
    // if (this._checkInputValidity()) {
    this._getArticles({
      keyword: this.input.value,

    });

    // }
  };



  _getArticles = (keyword) => {
    this.clearArticlesList();
    this.page.hideSections();
    this.page.hideButton();
    this.page.showSection(this.preloader);
    this.userInfo = keyword;
    this._api.getNews(this.userInfo)
      .then((res) => {
        console.log(res);
        this.processingResults(res.articles, keyword);

      })
      .catch((err) => {
        console.log(err.message);
        this.page.showSection(this.errorMessage);
      })
      .finally(() => {
        this.page.hideSection(this.preloader);
      })
  }

  processingResults = (res, keyword) => {
    this.articles = res;
    const length = res.length;
    sessionStorage.keyword = JSON.stringify(keyword);
    if (length === 0) {
      this.page.showSection(this.notFound)
      return
    }
    this.page.showSection(this.articlesSection);
    if (length > 3) {
      this.page.showButton();
      this.buttomMore.addEventListener('click', this.slicingArray)
    }
    this.slicingArray();
  }

  slicingArray = () => {
    // const data = JSON.parse(sessionStorage.articles).articles;
    // console.log(JSON.parse(sessionStorage.articles));
    const keyword = JSON.parse(sessionStorage.keyword);
    const blockArticles = this.articles.splice(0, 3);

    // console.log(JSON.parse(sessionStorage.articles).articles)
    this.renderArticles(blockArticles, keyword);
    if (this.articles.length === 0) {
      this.buttomMore.removeEventListener('click', this.slicingArray)
      this.page.hideButton();
    }
    console.log(this.articles.length);
  }

  setEventListener = () => {
    // this.input.addEventListener('input', )
    this.form.addEventListener('submit', this._searchArticles)
  }


}