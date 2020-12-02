import UtilsDate from "../utils/UtilsDate";
import { IMG_URL } from "../constants/constants";

export default class Articles {

  constructor(props) {
    this.data = props.data;
    this.keyword = props.keyword;
    this.api = props.api;
    this.path = props.path;

  }

  create = () => {
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
    // element.setAttribute('id','');
    element.insertAdjacentHTML('beforeend', markup.trim());

    return element;
  }

  render = () => {
    this.card = this.create();
    this.card.querySelector('.article__keyword').textContent = this.keyword;
    this.card.querySelector('.link-container').setAttribute('href', this.data.url);
    this.link = this.data.urlToImage || IMG_URL;
    this.card.querySelector('.article__image').setAttribute('src', this.link);
    this.card.querySelector('.article__date').setAttribute('datetime', this.data.publishedAt);
    this.card.querySelector('.article__date').textContent = new UtilsDate({ date: new Date() }).formatDate(this.data.publishedAt);
    this.card.querySelector('.article__title').textContent = this.data.title;
    this.card.querySelector('.article__text').textContent = this.data.description;
    this.card.querySelector('.article__link').textContent = this.data.source.name;
    this.card.querySelector('.article__button').classList.add('article__button_type_bookmark');
    this.card.querySelector('.article__tooltip-text').textContent = 'Войдите, чтобы сохранить статьи';

    const name = sessionStorage.getItem('name');
    if (name) {
      this.setEventListeners();
      this.card.querySelector('.article__tooltip-text').classList.add('article__tooltip-text_is-invisible')
    }
    return this.card;
  }


  renderSaveArticles = () => {
    this.card = this.create();
    this.card.querySelector('.article__keyword').textContent = this.data.keyword;
    this.card.querySelector('.link-container').setAttribute('href', this.data.url);
    this.link = this.data.image || IMG_URL;
    this.card.querySelector('.article__image').setAttribute('src', this.link);
    this.card.querySelector('.article__date').setAttribute('datetime', this.data.publishedAt);
    this.card.querySelector('.article__date').textContent = new UtilsDate({ date: new Date() }).formatDate(this.data.publishedAt);
    this.card.querySelector('.article__title').textContent = this.data.title;
    this.card.querySelector('.article__text').textContent = this.data.text;
    this.card.querySelector('.article__link').textContent = this.data.source;
    this.card.querySelector('.article__button').classList.add('article__button_type_trash');
    this.card.querySelector('.article__tooltip-text').textContent = 'Убрать из сохранённых';
    this.card.querySelector('.article__keyword').classList.remove('article__keyword_is-invisible');
    this.card.setAttribute('id', this.data._id);

    this.setEventListeners();


    return this.card;
  }

  // saved = () => {
  //   this.card.querySelector('.article__button').classList.toggle('place-card__like-icon_liked');
  // }

  saved(articleId, flag) {
    const icon = this.card.querySelector('.article__button');

    if (flag) {
      this.removeArticle = this.removeFromDatabase(articleId, this.data);
      icon.addEventListener('click', this.removeArticle);
    } else {
      this.addArticle = this.addToDatabase();
      icon.addEventListener('click', this.addArticle);
    }
  }

  remove = () => {
    this.removeEventListeners();
    this.card.remove();
    this.card = null;
  }

  clickHandler = (event) => {
    if (event.target.classList.contains('article__button_type_bookmark')) {
      this.addToDatabase();
    } else {
      this.removeFromDatabase();
    }
  }

  setEventListeners = () => {
    const icon = this.card.querySelector('.article__button');
    // this.addArticle = this.addToDatabaseHandler(this.data, this.keyword, this.api);
    // icon.addEventListener('click', this.addArticle);
    icon.addEventListener('click', this.clickHandler);

  }

  removeEventListeners = () => {
    const icon = this.card.querySelector('.article__button');


    icon.removeEventListener('click', this.clickHandler);


  }


  addToDatabase = () => {
    const cardInfo = {
      keyword: this.keyword,
      text: this.data.description,
      title: this.data.title,
      date: this.data.publishedAt,
      source: this.data.source.name,
      link: this.data.url,
      image: this.link,
    }

    this.api.createArticle(cardInfo)
      .then((res) => {
        const articleId = res.data._id;
        this.card.setAttribute('id', articleId);
        this.changeClass(true);
      })
      .catch((err) => {
        const error = err.validation.message || err.message
        console.log(error);
      })
  }

  changeClass = (flag) => {
    const icon = this.card.querySelector('.article__button');
    if (flag) {
      icon.classList.remove('article__button_type_bookmark');
      icon.classList.add('article__button_type_mark');
    } else {
      icon.classList.remove('article__button_type_mark');
      icon.classList.add('article__button_type_bookmark');
    }
  }

  removeFromDatabase = () => {
    const articleId = this.card.id;
    this.api.removeArticle(articleId)
      .then((res) => {
        if (window.location.pathname !== this.mainPath) {
          this.remove()
          return
        }
        this.card.removeAttribute('id');
        this.changeClass(false);

      })
      .catch((err) => {
        console.log(err);
      })
  }
}