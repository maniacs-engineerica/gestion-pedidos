import purchases from "@/data/purchases.js";
import UserHelper from "@/helpers/UserHelper";

export default class PurchaseHelper {
  static getOrCreate(id) {
    let purchase = purchases.find(p => p.id == id);
    if (!purchase) {
      purchase = purchases.find(p => p.status == 3);
    }
    if (!purchase) {
      purchase = this.create()
      purchases.push(purchase);
    }
    return purchase;
  }
  static getCurrent() {
    if (!UserHelper.isLogged()) {
      return null;
    }
    const user = UserHelper.getLoggedUser();
    let purchase = purchases.find(p => p.client.id == user.id && p.status == 3);
    if (purchase) {
      return purchase;
    }
    purchase = this.create();
    purchases.push(purchase);
    return purchase;
  }

  static create() {
    return {
      id: purchases.length,
      client: UserHelper.getLoggedUser(),
      status: 3,
      items: []
    };
  }

}