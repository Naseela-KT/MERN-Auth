import mongoose from "mongoose";

const connectDB=async()=>{
    try{
        const conc=await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected:${conc.connection.host}`)
    }catch(error){
        console.error(`Error:${error.message}`)
        process.exit(1)
    }
}

export default connectDB;