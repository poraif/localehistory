import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

// ----------------- User ----------------- //
export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

// ----------------- Placemark ----------------- //
export const PlacemarkSpec = Joi.object()
  .keys({
    title: Joi.string().max(30).required().example("Brendan Behan statue"),
    description: Joi.string().max(150).optional().example("A statue of the famous Irish writer"),
    year: Joi.number().optional().max(2030).example(1900),
    latitude: Joi.number().required().min(-90).max(90).example(53.349562),
    longitude: Joi.number().required().min(-180).max(180).example(-6.278198),
    category: Joi.string().required().valid("Landmark", "Residence", "Event", "Other").example("Landmark"),
    streetid: IdSpec,
  })
  .label("Placemark");

export const PlacemarkSpecPlus = PlacemarkSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("PlacemarkPlus");

export const PlacemarkArraySpec = Joi.array().items(PlacemarkSpecPlus).label("PlacemarkArray");

// ----------------- Street ----------------- //
export const StreetSpec = Joi.object()
  .keys({
    name: Joi.string().required().example("Meath Street"),
    userid: IdSpec,
    placemarks: PlacemarkArraySpec,
  })
  .label("Street");

export const StreetSpecPlus = StreetSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("StreetPlus");

export const StreetArraySpec = Joi.array().items(StreetSpecPlus).label("StreetArray");

// ----------------- JwtAuth ----------------- //
export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");