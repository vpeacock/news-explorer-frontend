
export default class MenuMobile {
  constructor(props) {
    this.menu = props.menu;
    this.buttonBurger = props.buttonBurger;
    this.buttonClose = props.buttonClose;
    this.page = props.page;
    this.overlay = props.overlay;
    this.mainPath = props.path;
    this.logo = props.logo;

  }

  open = () => {
    if(window.location.pathname !== this.mainPath){
      this.logo.classList.remove('logo_color_black');
      this.logo.classList.add('logo_color_white');
    }
    this.menu.classList.add('nav_is-visible');
    this.buttonBurger.classList.add('button-burger_is-invisible');
    this.buttonClose.classList.add('button-close_is-visible');
      this.page.disableScroll();
    this.overlay.classList.remove('popup_is-invisible');
    this._setListeners();


  }

  close = (flag) => {
    if(window.location.pathname !== this.mainPath){
      this.logo.classList.add('logo_color_black');
      this.logo.classList.remove('logo_color_white');
    }
    this.menu.classList.remove('nav_is-visible');
    if (flag) {
      this.buttonBurger.classList.remove('button-burger_is-invisible');
    }
    this.buttonClose.classList.remove('button-close_is-visible');
    this.page.enableScroll();
    this.overlay.classList.add('popup_is-invisible');
    this._removeListeners();
  }

  _setListeners = () => {
    this.buttonClose.addEventListener('click', this.close);
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' || event.key === 'Esc') {
        this.close(true);
      }
    });

    this.overlay.addEventListener('click', (event) => {
      if (event.target === this.overlay && event.target !== this.overlay.querySelector('.nav')) {
        this.close(true);
      }
    });
  }

  _removeListeners = () => {
    this.buttonClose.removeEventListener('click', this.close);
    document.removeEventListener('keydown', (event) => {
      if (event.key === 'Escape' || event.key === 'Esc') {
        this.close(true);
      }
    });

    this.overlay.removeEventListener('click', (event) => {
      if (event.target === this.overlay && event.target !== this.overlay.querySelector('.nav')) {
        this.close(true);
      }
    });
  }


}