import { userMongoStore } from "./mongo/user-mongo-store.js";
import { streetMongoStore } from "./mongo/street-mongo-store.js";
import { placemarkMongoStore } from "./mongo/placemark-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";

import { userJsonStore } from "./json/user-json-store.js";
import { streetJsonStore } from "./json/street-json-store.js";
import { placemarkJsonStore } from "./json/placemark-json-store.js";

export const db = {
  userStore: null,
  streetStore: null,
  placemarkStore: null,

init(storeType) {
  switch (storeType) {
    case "mongo":
      this.userStore = userMongoStore;
      this.streetStore = streetMongoStore;
      this.placemarkStore = placemarkMongoStore;
      connectMongo();
      break;
    default:
      this.userStore = userJsonStore;
      this.streetStore = streetJsonStore;
      this.placemarkStore = placemarkJsonStore;
  }
},
};
