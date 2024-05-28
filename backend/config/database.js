import mongoose from "mongoose"
import dotenv from "dotenv"


export const connectDB = async () => {
    await mongoose.connect(process.env.DATABASE_URL).then(() => console.log("Database connection success!"));
}

