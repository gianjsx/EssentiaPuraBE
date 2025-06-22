import mongoose from "mongoose";

const perfumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name required"],
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    reuired: [true, "Price required"],
  },
  priceDecant: {
    type: Number,
    reuired: [true, "Price required"],
  },
  imageURL: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  topNotes: {
    type: String,
  },
  middleNotes: {
    type: String,
  },
  baseNotes: {
    type: String,
  },
  is100ml: {
    type: Boolean,
  },
  isDecant: {
    type: Boolean,
  },
  brand: {
    type: String,
  },
});

export default mongoose.model("Perfum", perfumSchema);
