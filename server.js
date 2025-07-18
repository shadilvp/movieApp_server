import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"; 
const app = express()

dotenv.config()
const port = process.env.PORT

import authRouter from "./router/authRouter.js"
import productRouter from "./router/productRouter.js"
import adminRouter from "./router/adminRouter.js"
import UserRouter from "./router/userRouter.js"
import NotificationRouter from "./router/notificationRouter.js"
import cartRouter from "./router/cartRouter.js"
import orderRouter from "./router/orderRouter.js"

import connectDB from "./config/db.js"
import errorHandler from "./middlewares/errorHandler.js"


connectDB()

app.use(express.json())
app.use(errorHandler)
app.use(cookieParser()); 

app.use(cors({
    origin: "http://localhost:3000",
    credentials:true
}))

app.use('/api', authRouter)
app.use('/api', productRouter)
app.use('/api', UserRouter)
app.use('/api', NotificationRouter)
app.use('/api',adminRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.listen(port,()=>{
    console.log(`the server is litening to http://localhost:${port}`)
})


