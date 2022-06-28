import { Schema, model } from "mongoose";

const PetModel = new Schema(
  {
    name: String,
    age: Number,
  },
  { collection: "pets" }
);

export default model("pets", PetModel);
