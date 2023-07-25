import mongoose from "mongoose"

import dotenv from "dotenv";
dotenv.config();

const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=> console.log("DB connected successfull"))
    .catch((err)=>{
        console.log("DB connection issues")
        console.error(err)
        process.exit(1)
    })
}

export default connectDB;