

export const MAIN_BY_PATH = '/';
export const ARTICLES_PATH = '/articles.html';
export const COUNT_NEWS = 3;

export const NEWS_API_OPTIONS = {
  newsUrl: 'https://nomoreparties.co/news/v2/everything?q=',
  key: '629110d56d144da4a3a540e8ab2f89f5',
  findPeriodTime: 7,
  pageSize: 100,
  language: 'ru',
  sortBy: 'publishedAt',
};

export const MAIN_API_OPTIONS = {
  // baseUrl: 'https://api.explorernews.tk/',
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
};