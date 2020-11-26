export default class Search {
  constructor(props) {
    this.form = props.form;
    this.input = this.form.querySelector('.search__input');
    this.searchErrorMessage = this.form.querySelector('.error-message');
    this.button = this.form.querySelector('.button');
    this._api = props.api;
    this.page = props.instPage,
      this.errorMessage = props.serverError;
    this.notFound = props.messageNotFound;
    this.articlesSection = props.articlesSection;
    this.preloader = props.preloader;
    // this.buttomMore = props.buttomMore;
    this.clearArticlesList = props.clearArticlesList;

  }

  _searchArticles = (event) => {
    event.preventDefault();
    const flag = this.input.value;
    if (flag === "") {
      this.showErrorMessage();
      return
    }
    if (this.searchErrorMessage.classList.contains('error-message_is-opened')) {
      this.clearErrorMessage();
    }
    this._getArticles({
      keyword: this.input.value,

    });
  };

  showErrorMessage = () => {
    this.searchErrorMessage.classList.add('error-message_is-opened');
  }


  clearErrorMessage = () => {
    this.searchErrorMessage.classList.remove('error-message_is-opened');
  }

  _getArticles = (keyword) => {
    this.clearArticlesList();
    this.page.hideSections();
    this.page.hideButton();
    this.page.showSection(this.preloader);
    this.disableForm();
    this.userInfo = keyword;
    this._api.getNews(this.userInfo)
      .then((res) => {
        console.log(res.articles);
        this.page.processingResults(res.articles, keyword);
      })

      .finally(() => {
        this.enableForm();
        this.page.hideSection(this.preloader);
        this.form.reset();
      })
  }

  setEventListener = () => {
    this.form.addEventListener('submit', this._searchArticles);
  }

  disableForm = () => {
    // this.button.classList.remove('button_state_active');
    this.button.classList.add('button_state_inactive');
    this.input.setAttribute('disabled', true);
    this.button.setAttribute('disabled', true);
  };


  enableForm = () => {
    this.button.classList.remove('button_state_inactive');
    // this.button.classList.add('button_state_active');
    this.input.removeAttribute('disabled');
    this.button.removeAttribute('disabled');
  };


}