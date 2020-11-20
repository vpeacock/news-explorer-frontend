export default class Search {
  constructor(props) {
    this.form = props.form;
    this.input = this.form.querySelector('.search__input');
    this.errorMessage = this.form.querySelector('.error-message');
    this.button = this.form.querySelector('.button');
    this._api = props.api;
  }

  _searchArticles = (event) => {
    event.preventDefault();
    console.log(this.input);
    // if (this._checkInputValidity()) {
      this._getArticles({
        keyword: this.input.value,

      });

    // }
  };

  _getArticles = (data) => {
    this.userInfo = data;
    this._api.getNews(this.userInfo)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  setEventListener = () => {
    // this.input.addEventListener('input', )
    this.form.addEventListener('submit', this._searchArticles)
  }


}