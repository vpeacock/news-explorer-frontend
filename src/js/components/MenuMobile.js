
export default class MenuMobile {
  constructor(props) {
    this._menu = props.menu;
    this._buttonBurger = props.buttonBurger;
    this._buttonClose = props.buttonClose;
    this._page = props.page;
    this._overlay = props.overlay;
    this._mainPath = props.path;
    this._logo = props.logo;

  }

  open = () => {
    if(window.location.pathname !== this._mainPath){
      this._logo.classList.remove('logo_color_black');
      this._logo.classList.add('logo_color_white');
    }
    this._menu.classList.add('nav_is-visible');
    this._buttonBurger.classList.add('button-burger_is-invisible');
    this._buttonClose.classList.add('button-close_is-visible');
      this._page.disableScroll();
    this._overlay.classList.remove('popup_is-invisible');
    this.setListeners();


  }

  close = (flag) => {
    if(window.location.pathname !== this._mainPath){
      this._logo.classList.add('logo_color_black');
      this._logo.classList.remove('logo_color_white');
    }
    this._menu.classList.remove('nav_is-visible');
    if (flag) {
      this._buttonBurger.classList.remove('button-burger_is-invisible');
    }
    this._buttonClose.classList.remove('button-close_is-visible');
    this._page.enableScroll();
    this._overlay.classList.add('popup_is-invisible');
    this.removeListeners();
  }

  setListeners = () => {
    this._buttonClose.addEventListener('click', this.close);
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' || event.key === 'Esc') {
        this.close(true);
      }
    });

    this._overlay.addEventListener('click', (event) => {
      if (event.target === this._overlay && event.target !== this._overlay.querySelector('.nav')) {
        this.close(true);
      }
    });
  }

  removeListeners = () => {
    this._buttonClose.removeEventListener('click', this.close);
    document.removeEventListener('keydown', (event) => {
      if (event.key === 'Escape' || event.key === 'Esc') {
        this.close(true);
      }
    });

    this._overlay.removeEventListener('click', (event) => {
      if (event.target === this._overlay && event.target !== this._overlay.querySelector('.nav')) {
        this.close(true);
      }
    });
  }


}