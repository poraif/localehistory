import { Street } from "./street.js";
import { placemarkMongoStore } from "./placemark-mongo-store.js";

export const streetMongoStore = {
  async getAllStreets() {
    const streets = await Street.find().lean();
    return streets;
  },

  async getStreetById(id) {
    if (id) {
      const street = await Street.findOne({ _id: id }).lean();
      if (street) {
        street.placemarks = await placemarkMongoStore.getPlacemarksByStreetId(street._id);
      }
      return street;
    }
    return null;
  },

  async addStreet(street) {
    const newStreet = new Street(street);
    const streetObj = await newStreet.save();
    return this.getStreetById(streetObj._id);
  },

  async getUserStreets(id) {
    const street = await Street.find({ userid: id }).lean();
    return street;
  },

  async updateStreet(updatedStreet) {
    const street = await Street.findOne({ _id: updatedStreet._id });
    street.name = updatedStreet.name;
    street.img = updatedStreet.img;
    await street.save();
  },

  async deleteStreetById(id) {
    try {
      await Street.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllStreets() {
    await Street.deleteMany({});
  }
};