import Boom from "@hapi/boom";
import { StreetSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const streetApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const streets = await db.streetStore.getAllStreets();
        return streets;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const street = await db.streetStore.getStreetById(request.params.id);
        if (!street) {
          return Boom.notFound("No Street with this id");
        }
        return street;
      } catch (err) {
        return Boom.serverUnavailable("No Street with this id");
      }
    },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const street = request.payload;
        const newStreet = await db.streetStore.addStreet(street);
        if (newStreet) {
          return h.response(newStreet).code(201);
        }
        return Boom.badImplementation("error creating street");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const street = await db.streetStore.getStreetById(request.params.id);
        if (!street) {
          return Boom.notFound("No Street with this id");
        }
        await db.streetStore.deleteStreetById(street._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Street with this id");
      }
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.streetStore.deleteAllStreets();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
};