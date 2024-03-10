import { PlacemarkSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const placemarkController = {
  index: {
    handler: async function (request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.placemarkid);
      const viewData = {
        title: placemark.title,
        description: placemark.description,
        year: placemark.year,
        latitude: placemark.latitude,
        longitude: placemark.longitude,
        category: placemark.category,
      };
      return h.view("placemark-view", viewData);
    },
  },

  showUpdate: {
    handler: async function (request, h) {
      const street = await db.streetStore.getStreetById(request.params.id);
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.placemarkid);
      const viewData = {
        title: "Edit placemark",
        street: street,
        placemark: placemark,
      };
      return h.view("update-placemark-view", viewData);
    },
  },

  update: {
    validate: {
      payload: PlacemarkSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("placemark-view", { title: "Edit placemark error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.placemarkid);
      const newPlacemark = {
        title: request.payload.title,
        description: request.payload.description,
        year: Number(request.payload.year),
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),
        category: request.payload.category,
      };
      await db.placemarkStore.updatePlacemark(placemark, newPlacemark);
      return h.redirect(`/street/${request.params.id}`);
    },
  },
};