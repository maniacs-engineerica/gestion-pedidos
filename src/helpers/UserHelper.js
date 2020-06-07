class UserHelper {
  constructor() {
    this.loggedUser = {
      name: "Matias Cohen",
      id: 3,
      isAdmin: false,
      isClient: true
    };
    // this.loggedUser = null;
  }

  loginUser(user) {
    this.loggedUser = user;
  }

  isLogged() {
    return this.loggedUser !== null;
  }

  getLoggedUser() {
    return this.loggedUser;
  }
}
const helper = new UserHelper();
export default helper;
