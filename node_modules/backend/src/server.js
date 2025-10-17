import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import mongoose from 'mongoose'
import projectsRouter from './projects.routes.js'

const app = express()
app.use(cors())
app.use(helmet())
app.use(express.json({ limit: '1mb' }))
app.use(morgan('dev'))

app.use('/api/projects', projectsRouter)
app.get('/health', (_req, res) => res.json({ ok: true }))

const port = process.env.PORT || 4000
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cipherstudio'

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(mongoUri).then(() => {
    app.listen(port, () => console.log(`backend listening on :${port}`))
  }).catch(err => {
    console.error('Mongo connection error', err)
    process.exit(1)
  })
}

export default app


