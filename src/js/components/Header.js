export default class Header {
  constructor(options) {
    this.mainApi = options.api;
    this.authButton = options.authButton;
    this.mainPath = options.path;
    this.regUserButton = options.regUserButton;
    this.isRegistered = false;
    this.userName = '';
    this._userLogout = this._userLogout.bind(this);
  }

  render() {
    return this.mainApi.getUserData()
      .then((res) => {
        if (res.status === 200) {
          this._renderLogIn(res.data.data.name);
          return Promise.resolve(res.data.data);
        }
        if (window.location.pathname !== this.mainPath) {
          window.location.replace(this.mainPath);
        }
        return this._renderLogOut();
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  _renderLogIn(userName) {
    this.isRegistered = true;
    this.authButton.classList.add('lists__item_is-invisible');
    this.regUserButton.textContent = userName;
  }

  _renderLogOut() {
    this.isRegistered = false;
    this.regUserButton.classList.remove('lists__item_is-invisible');

  }

  _userLogout() {
    this.mainApi.logout()
      .then((res) => {
        if (res.status === 201) {
          if (window.location.pathname !== this.mainPath) {
            window.location.replace(this.mainPath);
            return;
          }
          this._renderLogOut();
          window.location.reload();
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

}