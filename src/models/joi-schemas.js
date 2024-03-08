import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required()
};

export const UserSpec = Joi.object()
  .keys({
    firstName: Joi.string().example("Homer").required(),
    lastName: Joi.string().example("Simpson").required(),
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
    _id: IdSpec,
    __v: Joi.number()
  })
  .label("UserDetails");
  
  export const UserArray = Joi.array().items(UserSpec).label("UserArray");

export const PlacemarkSpec = Joi.object()
  .keys({
    title: Joi.string().max(30).required().example("Brendan Behan statue"),
    description: Joi.string().max(150).optional().example("A statue of the famous Irish writer"),
    year: Joi.string().optional().max(6).example(1981),
    latitude: Joi.number().required().min(-90).max(90).example(53.349562),
    longitude: Joi.number().required().min(-180).max(180).example(-6.278198),
    category: Joi.string().valid("Landmark", "Residence", "Event", "Other").required().example("residence"),
    streetid: IdSpec,
  })
  .label("Placemark");

export const PlacemarkSpecPlus = PlacemarkSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("PlacemarkPlus");

export const PlacemarkArraySpec = Joi.array().items(PlacemarkSpecPlus).label("PlacemarkArray");

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
