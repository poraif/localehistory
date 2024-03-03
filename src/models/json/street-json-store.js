import { v4 } from "uuid";
import { db } from "./store-utils.js";
import { placemarkJsonStore } from "./placemark-json-store.js";

export const streetJsonStore = {
  async getAllStreets() {
    await db.read();
    return db.data.streets;
  },

  async addStreet(street) {
    await db.read();
    street._id = v4();
    db.data.streets.push(street);
    await db.write();
    return street;
  },

  async getStreetById(id) {
    await db.read();
    let list = db.data.streets.find((street) => street._id === id);
    if (list) {
      list.placemarks = await placemarkJsonStore.getPlacemarksByStreetId(list._id);
    } else {
      list = null;
    }
    return list;
  },

  async getUserStreets(userid) {
    await db.read();
    return db.data.streets.filter((street) => street.userid === userid);
  },

  async deleteStreetById(id) {
    await db.read();
    const index = db.data.streets.findIndex((street) => street._id === id);
    if (index !== -1) db.data.streets.splice(index, 1);
    await db.write();
  },

  async deleteAllStreets() {
    db.data.streets = [];
    await db.write();
  },
};