export default class ArticlesList {
  constructor(props) {
    this.container = props.container;
    this.cbCreateCard = props.cbCreateCard;
    this.api = props.api;

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
      api: this.api,
    }).render());
  }

  clear = () => {
    const articles = [...this.container.querySelectorAll('.article')];
    articles.forEach((article) => {
      this.removeCard(article);
    });
  }

  removeCard = (article) => {
    // console.log(getEventListeners(article)['click'][0]['listener']);
    // article.removeEventListener('click', getEventListeners(article)['click'][0]['listener']))
    article.remove();
  }


}