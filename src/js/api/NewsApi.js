import UtilsDate from "../utils/UtilsDate";
// import getDate from "../utils/index";

export default class NewsApi {
  constructor(props) {
    this.options = props.options;
  }

  getNews(keyword) {
    const utilsDate = new UtilsDate(new Date(), this.options.findPeriodTime);
     return fetch(`${this.options.newsUrl}${keyword.keyword}&from=${utilsDate.getPrevDate().toISOString()}&to=${new Date().toISOString()}&language=${this.options.language}&sortBy=${this.options.sortBy}&pageSize=${this.options.pageSize}&apiKey=${this.options.key}`)
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