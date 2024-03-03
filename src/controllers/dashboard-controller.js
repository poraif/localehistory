import { StreetSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const streets = await db.streetStore.getUserStreets(loggedInUser._id);
      const viewData = {
        title: "Locale History Dashboard",
        user: loggedInUser,
        streets: streets,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addStreet: {
    validate: {
      payload: StreetSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Error adding street", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newStreet = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      await db.streetStore.addStreet(newStreet);
      return h.redirect("/dashboard");
    },
  },

  deleteStreet: {
    handler: async function (request, h) {
      const street = await db.streetStore.getStreetById(request.params.id);
      await db.streetStore.deleteStreetById(street._id);
      return h.redirect("/dashboard");
    },
  },
};