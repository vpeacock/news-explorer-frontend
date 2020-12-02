import { COUNT_NEWS } from "../constants/constants";

export default class InfoBlock {
  constructor(props) {
    this.name = sessionStorage.name;
    this.articles = [];
    this.userNameDE = props.userNameDE;
    this.blockKeywordsDE = props.blockKeywordsDE;
    this.keywordsDE = props.keywordsDE;
    this.articlesCountDE = props.articlesCountDE;
  }

  render = () => {
    this.userNameDE.textContent = this.name;
    const count = this.getArticleInfo().count;
    const countKeywords = this.getKeywordsInfo().count;
    this.articlesCountDE.textContent = this.getArticleCount();
    console.log(count);
    if (count === 0) {
      this.blockKeywordsDE.classList.add('user-block__keywords_is-invisible');
    }
    this.keywordsDE.textContent = this.getKeywordsInfo();

  }

  getArticleInfo = () => {
    this.articles = JSON.parse(sessionStorage.articles);
    const count = this.articles.length;
    return { articles: this.articles, count }
  }

  getArticleCount = () => {
    const count = this.getArticleInfo().count;
    const text = this.setEndings();
    if (count === 0) {
      return 'нет сохраненных статей'
    }
    return `${count} ${text}`
  }

  setEndings = (num) => {
    num %= 100;
    if (num >= 5 && num <= 20) {
      return `сохраненных статей`;
    }
    num %= 10;
    if (num === 1) {
      return `сохраненная статья`;
    }
    if (num >= 2 && num <= 4) {
      return `сохраненных статьи`;
    }
    return `сохраненных статей`;
  }

  getKeywordsInfo = () => {
    const keywords = this.sortKeywords();
    const count = keywords.length;
    if (count === 0) {
      return
    } else if (count <= COUNT_NEWS) {
      return `${keywords.join(', ')}`
    } else if (count > COUNT_NEWS) {
      return `${keywords.splice(0, COUNT_NEWS).join(', ')}
      и ${keywords.length} другим`
    }

  }

  sortKeywords = () => {
    const repeat = this.getRepeat(this.articles);
    const keysSorted = Object.keys(repeat).sort(function (a, b) { return repeat[b] - repeat[a] })
    return keysSorted;
  };

  getRepeat = () => {
    return this.articles.map((article) => article.keyword).reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {});
  }


}