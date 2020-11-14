import UtilsDate from "../utils/UtilsDate";

export default class NewsApi {
  constructor(options) {
    this.options = options;
  }

  getNews(keyword) {
    const utilsDate = new UtilsDate(new Date());

    return fetch(`${this.options.newsUrl}${keyword}
    &from=${utilsDate.getPrevDate()}
    &to=${new Date()}
    &language=${this.options.language}
    &sortBy=publishedAt&pageSize=${this.options.pageSize}
    &apiKey=${this.options.key}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        const json = res.json();
        return json.then(Promise.reject.bind(Promise));
      })
      .catch((err) => Promise.reject(err));
  }


}