import express from "express"
import mongoose from "mongoose"
const app = express()
const port = 4000

import useRouter from "./router/AuthRouter.js"
import connectDB from "./config/db.js"

import cors from 'cors'

connectDB()

app.use(express.json())
app.use(cors())

connectDB();

app.use('/api', useRouter)

app.listen(port,()=>{ //Connected to the server
    console.log(`the server is litening to http://localhost:${port}`)
})


