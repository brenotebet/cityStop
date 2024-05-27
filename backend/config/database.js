import mongoose from "mongoose"
import dotenv from "dotenv"

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://brenotebet:39170133bB@cluster0.diyurdi.mongodb.net/?').then(() => console.log("Database connection success!"));
}

