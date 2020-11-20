export default class RegUser {
  constructor(props) {
    this.email = props.email;
    this.password = props.password;
    this.buttonName = props.name;
    this.api = props.api;
    this.userInfo = {};
  }

  entryUser(data) {
    let tmp = data['email'];
    this.userInfo = data;
    this.api.signin(this.userInfo)
      .then((data) => {
        this.render(tmp);

      })
      .catch((error) => {
        console.log(error);
      });
  }

  render(name) {
    this.buttonName.textContent = name;
  }
}