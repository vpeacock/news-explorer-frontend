
export default class MenuMobile {
  constructor(props) {
    this.menu = props.menu;
    this.buttonBurger = props.buttonBurger;
    this.buttonClose = props.buttonClose;

  }

  open = () => {
    this.menu.classList.add('nav_is-visible');
    this.buttonBurger.classList.add('button-burger_is-invisible');
    this.buttonClose.classList.add('button-close_is-visible');
    this.buttonClose.addEventListener('click', this.close);


  }

  close = (flag) => {
    this.menu.classList.remove('nav_is-visible');
    if (flag) {

      this.buttonBurger.classList.remove('button-burger_is-invisible');
    }
    this.buttonClose.classList.remove('button-close_is-visible');
    this.buttonClose.removeEventListener('click', this.close);
  }

}