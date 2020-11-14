export default class Page {
  constructor(header, search, articles, preloader, author, footer ) {
      this.header = header;
      this.search = search;
      this.articles = articles;
      this.preloader = preloader;
      this.author = author;
      this.footer  = footer;
      this.page = document.querySelector('.page');
  }

  render = () => {
    this.header.render();
    this.search.render();
    this.articles.render();
    this.preloader.render();
    this.author.render();
    this.footer.render();
  }

  disableScroll = () => {
    this.page.classList.add('page_no-scroll');
  }

  enableScroll = () => {
    this.page.classList.remove('page_no-scroll');
  }
}