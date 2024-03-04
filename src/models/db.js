// import { userMemStore } from "./mem/user-mem-store.ts";
// import { streetMemStore } from "./mem/street-mem-store.ts";
// import { placemarkMemStore } from "./mem/placemark-mem-store.ts";

import { userJsonStore } from "./json/user-json-store.js";
import { streetJsonStore } from "./json/street-json-store.js";
import { placemarkJsonStore } from "./json/placemark-json-store.js";

export const db = {
  userStore: null,
  streetStore: null,
  placemarkStore: null,

  init() {
    this.userStore = userJsonStore;
    this.streetStore = streetJsonStore;
    this.placemarkStore = placemarkJsonStore;
  },
};