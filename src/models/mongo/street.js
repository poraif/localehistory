import Mongoose from "mongoose";

const { Schema } = Mongoose;

const streetSchema = new Schema({
  title: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Street = Mongoose.model("Street", streetSchema);