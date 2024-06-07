import mongoose, { mongo } from "mongoose";

const adminSchema = new mongoose.Schema({
    name: {type: String, required: true},
    password: {type: String, required: true},
})

const adminModel = mongoose.model.admin || mongoose.model("admin", adminSchema)

export default adminModel