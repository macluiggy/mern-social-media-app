import { Schema } from "mongoose";

const PostSchema = new Schema({
  text: {
    type: String,
    required: "Text is required",
  },
});
