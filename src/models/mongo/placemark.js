import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placemarkSchema = new Schema({
  title: String,
  description: String,
  year: Number,
  latitude: Number,
  longitude: Number,
  category: String,
  streetid: {
    type: Schema.Types.ObjectId,
    ref: "Street",
  },
});

export const Placemark = Mongoose.model("Placemark", placemarkSchema);