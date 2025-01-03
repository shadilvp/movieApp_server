import express from "express"
import cors from "cors"
const app = express()
const port = 4000

import authRouter from "./router/AuthRouter.js"
import adminRouter from "./router/adminRouter.js"
import userRouter from "./router/userRouter.js"
import connectDB from "./config/db.js"
import errorHandler from "./middlewares/errorHandler.js"


connectDB()

app.use(express.json())
app.use(errorHandler)

app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}))

app.use('/api', authRouter)
app.use('/api/users', userRouter)
app.use('/api/admin',adminRouter)

app.listen(port,()=>{ //Connected to the server
    console.log(`the server is litening to http://localhost:${port}`)
})


