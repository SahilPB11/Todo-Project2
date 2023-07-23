import mongoose from "mongoose";

// conncted databe

const connectDB = async() => {
    try{
        await mongoose
        .connect(process.env.Mongo_uri,{
            dbName: "ToDoApp",
            useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then(() => console.log("databse connected safely"))
    }catch{(error)
        console.log(error);
    }
}

export default connectDB;

  