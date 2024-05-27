import express from "express"
import cors from "cors"
import { connectDB } from "./config/database.js"
import foodRouter from "./routes/foodRoute.js"

//app config
const app = express()

const PORT = 3000

//middleware
app.use(cors())
app.use(express.json())

//database connection
connectDB()


//endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'))


app.get("/", (req, res) => {
    res.send("API Working")
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

