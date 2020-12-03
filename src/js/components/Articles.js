import UtilsDate from "../utils/UtilsDate";
import { IMG_URL } from "../constants/constants";

export default class Articles {
  constructor(props) {
    this._data = props.data;
    this._keyword = props.keyword;
    this._api = props.api;
    this._path = props.path;

  }

  _create = () => {
    const markup =
      `<span class="article__keyword article__keyword_is-invisible"></span>
    <div class="article__button-container">
      <button class="article__button"><span class="article__tooltip-text">
          Войдите, чтобы сохранить статьи</span></button>
    </div>
    <a href="" target="_blank" class="link-container">
      <img class="article__image" src=""
        alt="Иллюстрация к статье">
      <div class="article__text-container">
      <time datetime="" class="article__date"></time>
        <h3 class="title title_size_s article__title"></h3>
        <p class="article__text"></p>
        <span class="title title_size_xs article__link"></span>
      </div>
    </a>`;

    const element = document.createElement('li');
    element.classList.add('article');
    element.insertAdjacentHTML('beforeend', markup.trim());
    return element;
  }

  render = () => {
    this.card = this._create();
    this.card.querySelector('.article__keyword').textContent = this._keyword;
    this.card.querySelector('.link-container').setAttribute('href', this._data.url);
    this.link = this._data.urlToImage || IMG_URL;
    this.card.querySelector('.article__image').setAttribute('src', this.link);
    this.card.querySelector('.article__date').setAttribute('datetime', this._data.publishedAt);
    this.card.querySelector('.article__date').textContent = new UtilsDate({ date: new Date() }).formatDate(this._data.publishedAt);
    this.card.querySelector('.article__title').textContent = this._data.title;
    this.card.querySelector('.article__text').textContent = this._data.description;
    this.card.querySelector('.article__link').textContent = this._data.source.name;
    this.card.querySelector('.article__button').classList.add('article__button_type_bookmark');
    this.card.querySelector('.article__tooltip-text').textContent = 'Войдите, чтобы сохранить статьи';

    const name = sessionStorage.getItem('name');
    if (name) {
      this._setEventListeners();
      this.card.querySelector('.article__tooltip-text').classList.add('article__tooltip-text_is-invisible')
    }
    return this.card;
  }


  renderSaveArticles = () => {
    this.card = this._create();
    this.card.querySelector('.article__keyword').textContent = this._data.keyword;
    this.card.querySelector('.link-container').setAttribute('href', this._data.url);
    this.link = this._data.image || IMG_URL;
    this.card.querySelector('.article__image').setAttribute('src', this.link);
    this.card.querySelector('.article__date').setAttribute('datetime', this._data.publishedAt);
    this.card.querySelector('.article__date').textContent = new UtilsDate({ date: new Date() }).formatDate(this._data.publishedAt);
    this.card.querySelector('.article__title').textContent = this._data.title;
    this.card.querySelector('.article__text').textContent = this._data.text;
    this.card.querySelector('.article__link').textContent = this._data.source;
    this.card.querySelector('.article__button').classList.add('article__button_type_trash');
    this.card.querySelector('.article__tooltip-text').textContent = 'Убрать из сохранённых';
    this.card.querySelector('.article__keyword').classList.remove('article__keyword_is-invisible');
    this.card.setAttribute('id', this._data._id);
    this._setEventListeners();
    return this.card;
  }

  _saved(articleId, flag) {
    const icon = this.card.querySelector('.article__button');
    if (flag) {
      this.removeArticle = this._removeFromDatabase(articleId, this._data);
      icon.addEventListener('click', this.removeArticle);
    } else {
      this.addArticle = this._addToDatabase();
      icon.addEventListener('click', this.addArticle);
    }
  }

  remove = () => {
    this._removeEventListeners();
    this.card.remove();
    this.card = null;
  }

  _clickHandler = (event) => {
    if (event.target.classList.contains('article__button_type_bookmark')) {
      this._addToDatabase();
    } else {
      this._removeFromDatabase();
    }
  }

  _setEventListeners = () => {
    const icon = this.card.querySelector('.article__button');
    icon.addEventListener('click', this._clickHandler);

  }

  _removeEventListeners = () => {
    const icon = this.card.querySelector('.article__button');
    icon.removeEventListener('click', this._clickHandler);
  }


  _addToDatabase = () => {
    const cardInfo = {
      keyword: this._keyword,
      text: this._data.description,
      title: this._data.title,
      date: this._data.publishedAt,
      source: this._data.source.name,
      link: this._data.url,
      image: this.link,
    }

    this._api.createArticle(cardInfo)
      .then((res) => {
        const articleId = res.data._id;
        this.card.setAttribute('id', articleId);
        this._changeClass(true);
      })
      .catch((err) => {
        const error = err.validation.message || err.message
        console.log(error);
      })
  }

  _changeClass = (flag) => {
    const icon = this.card.querySelector('.article__button');
    if (flag) {
      icon.classList.remove('article__button_type_bookmark');
      icon.classList.add('article__button_type_mark');
    } else {
      icon.classList.remove('article__button_type_mark');
      icon.classList.add('article__button_type_bookmark');
    }
  }

  _removeFromDatabase = () => {
    const articleId = this.card.id;
    this._api.removeArticle(articleId)
      .then((res) => {
        if (window.location.pathname !== this._path) {
          this.remove()
          return
        }
        this.card.removeAttribute('id');
        this._changeClass(false);

      })
      .catch((err) => {
        console.log(err);
      })
  }
}