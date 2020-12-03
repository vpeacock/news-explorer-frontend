export default class ArticlesList {
  constructor(props) {
    this._container = props.container;
    this.cbCreateCard = props.cbCreateCard;
    this._api = props.api;
    this._path = props.path;
  }

  render = (cards, keyword) => {
    this.cards = cards;
    this.cards.forEach(item => {
      this._addCard(item, keyword);
    });
  }

  _addCard = (data, keyword) => {
    this._container.appendChild(this.cbCreateCard({
      data: data,
      keyword: keyword,
      path: this._path,
      api: this._api,
    }));
  }

  clear = () => {
    const articles = [...this._container.querySelectorAll('.article')];
    if (articles.length !== 0) {
      articles.forEach((article) => {
        article.remove();
      });
    }
  }
}