import UtilsDate from "../utils/UtilsDate";

export default class NewsApi {
  constructor(props) {
    this.options = props.options;
  }

  getNews(keyword) {
    const utilsDate = new UtilsDate({ date: new Date(), period: this.options.findPeriodTime });
    return fetch(`${this.options.newsUrl}${keyword.keyword}&from=${utilsDate.getPrevDate()}&to=${utilsDate.getCurrentDate()}&language=${this.options.language}&sortBy=${this.options.sortBy}&pageSize=${this.options.pageSize}&apiKey=${this.options.key}`)
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