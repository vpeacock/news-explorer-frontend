export default class UserInfo {
  constructor() {
    this.userInfo = {};
  }

  regUserInfo = (data) => {

    this.userInfo = data;
    this.api.signup(this.userInfo)
      .then((data) => {
        this.successPopup.open();
        // this.render(data);

      })
      .catch((error) => {
        console.log(error);
      });
  }
}