import Mongoose from "mongoose";

const { Schema } = Mongoose;

const streetSchema = new Schema({
  name: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Street = Mongoose.model("Street", streetSchema);