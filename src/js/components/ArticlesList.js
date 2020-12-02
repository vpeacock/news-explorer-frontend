export default class ArticlesList {
  constructor(props) {
    this.container = props.container;
    this.cbCreateCard = props.cbCreateCard;
    this.api = props.api;
    this.path = props.MAIN_BY_PATH
  }

  render = (cards, keyword) => {
    this.cards = cards;
    this.cards.forEach(item => {
      this.addCard(item, keyword);
    });
  }

  addCard = (data, keyword) => {

    this.container.appendChild(this.cbCreateCard({
      data: data,
      // urlToImage: data.urlToImage,
      // url: data.url,
      // publishedAt: data.publishedAt,
      // title: data.title,
      // description: data.description,
      // source: data.source,
      keyword: keyword,
      path: this.path,
      api: this.api,
    }));
  }

  clear = () => {
    const articles = [...this.container.querySelectorAll('.article')];
    if (articles.length !== 0) {
      articles.forEach((article) => {
        article.remove();
      });
    }
  }
}