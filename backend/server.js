    import express from "express"
    import cors from "cors"
    import { connectDB } from "./config/database.js"
    import foodRouter from "./routes/foodRoute.js"
    import userRouter from "./routes/userRoute.js"
    import 'dotenv/config.js'
    import cartRouter from "./routes/cartRoute.js"
    import orderRouter from "./routes/orderRoute.js"
    import adminRouter from "./routes/adminRoute.js"

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
    app.use("/api/user", userRouter);
    app.use("/api/cart", cartRouter);
    app.use("/images", express.static('uploads'))
    app.use("/api/order", orderRouter);
    app.use("/api/admin", adminRouter)


    app.get("/", (req, res) => {
        res.send("API Working")
    })

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`)
    })

