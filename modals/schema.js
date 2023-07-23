import mongoose from "mongoose";

// making a schema
const schema = mongoose.Schema({
    name: {
      type: String,
      required : true,
    },
    email: {
      type: String,
      unique: true,
      required : true,
    },
    password: {
      type : String,
      required : true,
      select : false,      
    },
    createAt: {
      type: Date,
      default : Date.now(),
    }
  });
export const User = mongoose.model("User", schema);