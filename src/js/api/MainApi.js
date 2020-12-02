export default class MainApi {
  constructor(props) {
    this.options = props.options;
  }

  signup({ email, password, name }) {
    return fetch(`${this.options.baseUrl}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: this.options.headers,
      body: JSON.stringify({ email, password, name, }),
    })
      .then((res) => this.requestHandler(res)
        .then((data) => ({ status: res.status, data })))

  }


  signin({ email, password }) {
    return fetch(`${this.options.baseUrl}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: this.options.headers,
      body: JSON.stringify({ email, password, }),
    })
      .then((res) => this.requestHandler(res)
        .then((data) => ({ status: res.status, data })))
  }


  logout() {
    return fetch(`${this.options.baseUrl}/signout`, {
      method: 'POST',
      credentials: 'include',
      headers: this.options.headers,
    })
      .then((res) => this.requestHandler(res)
        .then((data) => ({ status: res.status, data })))
  }

  getUserData() {

    return fetch(`${this.options.baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this.options.headers,
    })
      .then((res) => this.requestHandler(res)
        .then((data) => ({ status: res.status, data })))

  }

  getArticles() {
    return fetch(`${this.options.baseUrl}/articles`, {
      method: 'GET',
      credentials: 'include',
      headers: this.options.headers,
    })
      .then((res) => this.requestHandler(res)
        .then((data) => ({ status: res.status, data })))
  }

  createArticle(data) {
    return fetch(`${this.options.baseUrl}/articles`, {
      method: 'POST',
      credentials: 'include',
      headers: this.options.headers,
      body: JSON.stringify({
        keyword: data.keyword,
        title: data.title,
        text: data.text,
        date: data.date,
        source: data.source,
        link: data.link,
        image: data.image,
      }),
    })
      .then((res) => this.requestHandler(res)
        .then((data) => ({ status: res.status, data })))
  }

  removeArticle(id) {
    return fetch(`${this.options.baseUrl}/articles/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this.options.headers,
    })
      .then((res) => this.requestHandler(res)
        .then((data) => ({ status: res.status, data })))
  }

  requestHandler(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json().then(Promise.reject.bind(Promise))
  }
}