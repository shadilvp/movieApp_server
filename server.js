import express from "express"
const app = express()
const port = 4000

import authRouter from "./router/AuthRouter.js"
import adminRouter from "./router/adminRouter.js"
import userRouter from "./router/userRouter.js"
import connectDB from "./config/db.js"

import cors from 'cors'

connectDB()

app.use(express.json())



app.use('/api', authRouter)
app.use('/api', userRouter)
app.use('/api',adminRouter)

app.listen(port,()=>{ //Connected to the server
    console.log(`the server is litening to http://localhost:${port}`)
})


