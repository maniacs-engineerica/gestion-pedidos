import users from "../data/users.js";

class UserHelper {
  constructor() {
    // this.loggedUser = users[0];
    this.loggedUser = null;
  }

  login(email, password, callback) {
    const user = users.find(u => u.email === email && u.password === password);
    const error = user == null ? "Usuario y/o contraseña inválida" : null;
    callback(user, error);
    this.loggedUser = user;
  }

  logout(){
    this.loggedUser = null;
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
