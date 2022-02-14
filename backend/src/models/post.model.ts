import mongoose, { Schema } from "mongoose";
import type { Document } from "mongoose";

type PostSchemaProps = {
  text: string;
  photo: { data: Buffer; contentType: string };
  likes: number;
  comments: string;
  postedBy: { type: mongoose.Types.ObjectId; ref: "User" };
  created: Date;
};

type PostSchemaDoc = PostSchemaProps & Document;
// interface PostSchemaDoc extends PostSchemaProps, Document {}
const PostSchema = new Schema<PostSchemaDoc>({
  text: {
    type: String,
    required: [true, "Text is required"],
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  comments: [
    {
      text: String,
      created: { type: Date, default: Date.now },
      postedBy: { type: mongoose.Types.ObjectId, ref: "User" },
    },
  ],
  postedBy: { type: mongoose.Types.ObjectId, ref: "User" },
  created: { type: Date, default: Date.now },
});
