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
    // this._userLogout = this._userLogout.bind(this);
  }

  render = () => {
    return this.mainApi.getUserData()
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log(res.data.name);
          this._renderLogIn(res.data.name);
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
        console.log(res.status);
        if (res.status === 200) {
          if (window.location.pathname !== this.mainPath) {
            window.location.replace(this.mainPath);
            return;
          }
          this._renderLogOut();
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