import express from "express"
import cors from "cors"
import dotenv from "dotenv"
const app = express()

dotenv.config()
const port = process.env.PORT

import authRouter from "./router/authRouter.js"
// import adminRouter from "./router/adminRouter.js"
// import userRouter from "./router/userRouter.js"
import connectDB from "./config/db.js"
import errorHandler from "./middlewares/errorHandler.js"


connectDB()

app.use(express.json())
app.use(errorHandler)

app.use(cors({
    origin: 'https://baby-productsdi.onrender.com',
    credentials:true
}))

app.use('/api', authRouter)
// app.use('/api/users', userRouter)
// app.use('/api/admin',adminRouter)

app.listen(port,()=>{
    console.log(`the server is litening to http://localhost:${port}`)
})


