import Boom from "@hapi/boom";
import { IdSpec, StreetArraySpec, StreetSpec, StreetSpecPlus } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";

export const streetApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const streets = await db.streetStore.getAllStreets();
        return streets;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: StreetArraySpec, failAction: validationError },
    description: "Get all streets",
    notes: "Returns all streets",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
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
    tags: ["api"],
    description: "Find a Street",
    notes: "Returns a street",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: StreetSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
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
    tags: ["api"],
    description: "Create a Street",
    notes: "Returns the newly created street",
    validate: { payload: StreetSpec, failAction: validationError },
    response: { schema: StreetSpecPlus, failAction: validationError },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
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
    tags: ["api"],
    description: "Delete a street",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.streetStore.deleteAllStreets();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all StreetApi",
  },
};