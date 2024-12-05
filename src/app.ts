import express, { Application, Request, Response } from 'express'
import cors from 'cors'

const app: Application = express()

app.use(cors())

// application routes
import userRoutes from './app/modules/user/user.route'
import academyRoutes from './app/modules/academy/academy.route'
// parse data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// interface
// schema
// model
// db query

app.use('/api/v1/user/', userRoutes)
app.use('/academy/', academyRoutes)

app.get('/', async (req: Request, res: Response) => {
  res.send('working')
})
export default app
