export default class RegUser {
  constructor(userEmail,
    userPassword,
    api, userName,
  ) {
    this.email = userEmail;
    this.password = userPassword;
    this.userName = userName;
    this.api = api;
    this.userInfo = {};
  }

  entryUser(data) {

    this.userInfo = data;
    this.api.signin(this.userInfo)
      .then((data) => {
        this.render(data);

      })
      .catch((error) => {
        console.log(error);
      });
  }

  render(email) {
    this.userName.textContent = this.api.getUser(email);

  }
}