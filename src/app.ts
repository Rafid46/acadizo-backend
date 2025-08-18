import express, { Application, Request, Response, NextFunction } from 'express'
import authRoutes from './app/modules/auth/auth.route'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app: Application = express()
import path from 'path'
import fs from 'fs'
app.use(
  cors({
    origin: [
      'https://acadizo.netlify.app',
      'http://localhost:3000',
      'http://localhost:5173',
    ],
    credentials: true,
  }),
)
app.use(cors())
// app.use(cookieParser())
// application routes
import userRoutes from './app/modules/user/user.route'
import academyRoutes from './app/modules/academy/academy.route'
import moduleRoutes from './app/modules/chapter-modules/module.route'
import activityRoutes from './app/modules/activity/activity.route'
import multer from 'multer'

// parse data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use('/api/v1/auth', jwtRoutes)

app.use('/auth', authRoutes)

// interface
// schema
// model
// db query

// app.use('/upload', upload.single('file'), (req: Request, res: Response) => {
//   console.log(req.body)
//   console.log(req.file)

//   if (!req.file) {
//     return res.status(400).json({ error: 'File not uploaded' })
//   }

//   return res.status(200).json({
//     message: 'File uploaded successfully',
//     file: `../upload/${req.file.filename}`,
//   })
// })
// app.use(
//   multer({ storage: upload }).array('file', 12),
//   async (req, res, next) => {
//     fs.writeFileSync(`./upload/${req.file.filename}`, req.files)
//     next()
//   },
// )

// // server static files
// app.use('/upload', express.static(path.join(__dirname, 'file')))

// Single File Upload Route
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/file')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname.replace(/\s+/g, '_'))
  },
})

app.use(multer({ storage: fileStorage }).single('file'))

app.use('/file', express.static(path.join(__dirname, 'file')))
app.use('/api/v1/user/', userRoutes)
app.use('/academy/', academyRoutes)
app.use('/modules/', moduleRoutes)
app.use('/activity/', activityRoutes)
// app.use('/uploads', express.static('uploads'))

app.get('/', async (req: Request, res: Response) => {
  res.send('working')
})
export default app
