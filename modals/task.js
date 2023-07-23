import mongoose from "mongoose";

// making a schema
const schema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isCompleted: {
      type : Boolean,
      default : false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createAt: {
      type: Date,
      default : Date.now(),
    }
  });
export const Task = mongoose.model("Task", schema);