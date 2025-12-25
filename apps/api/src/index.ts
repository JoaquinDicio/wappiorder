import express from 'express'
import cors from 'cors'
import { configDotenv } from 'dotenv'
import authRouter from './routes/auth.routes.js'

const app = express()

const PORT = 8080

app.use(express.json())

app.use(cors())

configDotenv()

app.listen(PORT, () => {
    console.log(`Wappiorder is now running at: ${PORT}`)
})

app.use('/auth', authRouter)

