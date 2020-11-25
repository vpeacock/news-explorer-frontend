export default class Page {
  constructor(props) {
    this.errorMessage = props.serverError;
    this.notFound = props.messageNotFound;
    this.articles = props.articles;
    this.preloader = props.preloader;
    this.button = props.button;
    this.page = document.querySelector('.page');

  }

  showSection = (section) => {
    section.classList.remove('message_is-invisible');
  }

  showButton = () => {
    this.button.classList.remove('button_is-invisible');
  }

  hideButton = () => {
    if (!this.button.classList.contains('button_is-invisible')) {
      this.button.classList.add('button_is-invisible');
    }
  }

  hideSection = (section) => {
    section.classList.add('message_is-invisible');
  }

  disableScroll = () => {
    this.page.classList.add('page_no-scroll');
  }

  enableScroll = () => {
    this.page.classList.remove('page_no-scroll');
  }

  hideSections = () => {
    const sections = [...this.page.querySelectorAll('.message')];
    sections.forEach((section) => {
      if (section.classList.contains('message_is-invisible')) {
        return
      }
      this.hideSection(section);
    });
  }

}