import { JSONFilePreset } from "lowdb/node";

export const db = await JSONFilePreset("src/models/json/db.json", {
  users: [],
  streets: [],
  placemarks: [],
});