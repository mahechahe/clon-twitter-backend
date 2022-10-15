import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    category: String,
    selectedFile: String,
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    createdby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Post", postSchema);
