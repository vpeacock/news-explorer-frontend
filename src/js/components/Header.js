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
    // this._userLogout = this._userLogout.bind(this);
  }

  render = () => {
    const arr = sessionStorage.articles;
    if(arr) {
       this.articles = JSON.parse(sessionStorage.articles);
    }
    return this.mainApi.getUserData()
      .then((res) => {
        if (res.status === 200) {
          sessionStorage.name = res.data.name;
          const name = sessionStorage.getItem('name');
          console.log(name);
          this._renderLogIn(res.data.name);
          this.clearArticlesList();
          this.page.setArticleData(this.articles);

          // window.location.reload();
          // return Promise.resolve(res.data);

        }
      })
      .catch((err) => {
        console.log(err.message);
        if (window.location.pathname !== this.mainPath) {
          window.location.replace(this.mainPath);
        }
        return this._renderLogOut();

      });
  }


  _renderLogIn = (userName) => {
    this.isRegistered = true;
    this._itemUnath.classList.add('lists__item_is-invisible');
    this._logoutButton.textContent = userName;
    this._itemsAuth.forEach(item => {
      item.classList.remove('lists__item_is-invisible')
    });
    this._authButton.removeEventListener('click', () => {
      this._instPopupLog.open();
    });
    this._logoutButton.addEventListener('click', this._userLogout);

    //снять слушатель с кнопки authButton
    // повесить слушатель на кнопку logoutButton


  }

  _renderLogOut = () => {
    this.isRegistered = false;
    this._logoutButton.textContent = ' ';
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
          // window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err.message);

      });
  }


  // authSignupButton.setEventListener('click', () => {
  //   // formEnterValidator.clearErrors();
  //   // formEnterValidator.setSubmitButtonState(false);
  //   this._instPopupLog.open();
  // });


}