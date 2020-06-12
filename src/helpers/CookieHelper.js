class CookieHelper {
  get(name) {
    var re = new RegExp(name + "=[^;]+", "i");
    //if cookie found
    if (document.cookie.match(re)) {
      //return its value
      var value = document.cookie.match(re)[0].split("=")[1];
      return value;
    }
    return "";
  }

  set(name, value) {
    if (value == null) {
      this.remove(name);
      return;
    }
    document.cookie = name + "=" + value + ";";
  }

  remove(name) {
    const mydate = new Date();
    mydate.setTime(mydate.getTime() - 1);
    document.cookie = name + "=; expires=" + mydate.toGMTString();
  }
}
export default new CookieHelper();
