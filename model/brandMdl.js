import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name of the brand is required"],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  imageURL: {
    type: String,
  },
});

export default mongoose.model("Brand", brandSchema);
