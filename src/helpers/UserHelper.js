class UserHelper {
  constructor() {
    this.loggedUser = {
      name: "Matias Cohen"
    };
    this.loggedUser = null;
  }

  loginUser(user) {
    this.loggedUser = user;
  }

  isLogged() {
    return this.loggedUser !== null;
  }

  isAdmin() {
    return false;
  }

  isClient() {
    return true;
  }

  getLoggedUser() {
    return this.loggedUser;
  }
}
const helper = new UserHelper();
export default helper;
