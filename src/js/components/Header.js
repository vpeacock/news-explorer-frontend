export default class Header {
  constructor(props) {
    this.mainApi = props.api;
    this._authButton = props.authButton;
    this._itemUnath = props.itemUnath;
    this._itemsAuth = props.itemsAuth;
    this._instPopupLog = props.instPopupLog;
    this.mainPath = props.path;
    this._logoutButton = props.logoutButton;
    this.isRegistered = false;
    this.userName = '';
    this.page = props.page;
    this.clearArticlesList = props.clearArticlesList;
    this.articles = {};
  }

  render = () => {
    const arr = sessionStorage.articles;
    if (arr) {
      this.articles = JSON.parse(sessionStorage.articles);
    }
    return this.mainApi.getUserData()
      .then((res) => {
        sessionStorage.name = res.data.name;
        if (window.location.pathname !== this.mainPath) {
          this.setButtonName(res.data.name);
          this._logoutButton.addEventListener('click', this._userLogout);
          return
        }
        this._renderLogIn(res.data.name);
        this.clearArticlesList();
        this.page.setArticleData(this.articles);
      })
      .catch((err) => {
        console.log(err.message);
        if (window.location.pathname !== this.mainPath) {
          window.location.replace(this.mainPath);
        }
        return this._renderLogOut();
      });
  }

  setButtonName = (name) => {
    this._logoutButton.querySelector('.button__name').textContent = name;
  }


  _renderLogIn = (userName) => {
    this.isRegistered = true;
    this._itemUnath.classList.add('lists__item_is-invisible');
    this.setButtonName(userName);
    this._itemsAuth.forEach(item => {
      item.classList.remove('lists__item_is-invisible')
    });
    this._authButton.removeEventListener('click', () => {
      this._instPopupLog.open();
    });
    this._logoutButton.addEventListener('click', this._userLogout);
  }

  _renderLogOut = () => {
    this.isRegistered = false;
    this._logoutButton.querySelector('.button__name').textContent = "";
    sessionStorage.removeItem('name');
    this._itemUnath.classList.remove('lists__item_is-invisible');
    this._itemsAuth.forEach(item => {
      item.classList.add('lists__item_is-invisible')
    });
    this._authButton.addEventListener('click', () => {
      this._instPopupLog.open();
    });
    this._logoutButton.removeEventListener('click', this._userLogout);
  }

  _userLogout = () => {
    this.mainApi.logout()
      .then((res) => {
        if (res.status === 200) {
          if (window.location.pathname !== this.mainPath) {
            window.location.replace(this.mainPath);
            return;
          }
          this._renderLogOut();
          this.clearArticlesList();
          this.page.hideSections();
        }
      })
      .catch((err) => {
        console.log(err.message);

      });
  }
}