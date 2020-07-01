import CookieHelper from "./CookieHelper.js";
import axios from "axios";

class UserHelper {
  constructor() {
    this.loggedUser = null;
    const user = CookieHelper.get("user")
    if (user){
      this.loggedUser = JSON.parse(user)
    }
  }

  async login(email, password) {
    const credentials = {
      email: email,
      password: password
    }
    const response = await axios.post("users/login", credentials)
    const user = response.data;
    this.loggedUser = user;
    if (user != null){
      CookieHelper.set("user", JSON.stringify(user));
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
