import users from "../data/users.js";
import CookieHelper from "./CookieHelper.js";

class UserHelper {
  constructor() {
    this.loggedUser = null;
    const user = CookieHelper.get("user")
    if (user){
      this.loggedUser = JSON.parse(user)
    }
  }

  login(email, password, callback) {
    const user = users.find(u => u.email === email && u.password === password);
    const error = user == null ? "Usuario y/o contraseña inválida" : null;
    callback(user, error);
    this.loggedUser = user;
    if (user != null){
      CookieHelper.set("user", JSON.stringify(user))
    }
  }

  logout(){
    this.loggedUser = null;
    CookieHelper.remove("user");
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
