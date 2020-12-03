export default class Search {
  constructor(props) {
    this._form = props.form;
    this._input = this._form.querySelector('.search__input');
    this._searchErrorMessage = this._form.querySelector('.error-message');
    this._button = this._form.querySelector('.button');
    this._api = props.api;
    this._page = props.instPage;
    this._errorMessage = props.serverError;
    this._notFound = props.messageNotFound;
    this._articlesSection = props.articlesSection;
    this._preloader = props.preloader;
    this._clearArticlesList = props.clearArticlesList;

  }

  _searchArticles = (event) => {
    event.preventDefault();
    const flag = this._input.value.trim();
    if (flag === "") {
      this.showErrorMessage();
      return
    }
    if (this._searchErrorMessage.classList.contains('error-message_is-opened')) {
      this.clearErrorMessage();
    }
    this._getArticles({
      keyword: this._input.value,
    });
  };

  showErrorMessage = () => {
    this._searchErrorMessage.classList.add('error-message_is-opened');
  }

  clearErrorMessage = () => {
    this._searchErrorMessage.classList.remove('error-message_is-opened');
  }

  _getArticles = (keyword) => {
    this._clearArticlesList();
    this._page.hideSections();
    this._page.hideButton();
    this._page.showSection(this._preloader);
    this.disableForm();
    this.userInfo = keyword;
    this._api.getNews(this.userInfo)
      .then((res) => {
        this._page.processingResults(res.articles, keyword);
      })
      .finally(() => {
        this.enableForm();
        this._page.hideSection(this._preloader);
        this._form.reset();
      })
  }

  setEventListener = () => {
    this._form.addEventListener('submit', this._searchArticles);
  }

  disableForm = () => {
    this._button.classList.add('button_state_inactive');
    this._input.setAttribute('disabled', true);
    this._button.setAttribute('disabled', true);
  };

  enableForm = () => {
    this._button.classList.remove('button_state_inactive');
    this._input.removeAttribute('disabled');
    this._button.removeAttribute('disabled');
  };
}