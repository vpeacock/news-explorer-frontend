export default class UserInfo {
  constructor(props) {
    this.email = props.email;
    this.password = props.password;
    this.name = props.name;
    this.api = props.api;
    this.successPopup = props.popup;
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