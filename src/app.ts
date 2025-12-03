import express, { Application, Request, Response, NextFunction } from 'express'
import authRoutes from './app/modules/auth/auth.route'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app: Application = express()
import path from 'path'
import fs from 'fs'
import { createServer } from 'http'
import { Server } from 'socket.io'

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
import groupChatRoutes from './app/modules/chat/groupChat.route'
import multer from 'multer'
import Chat from './app/modules/chat/chat.model'

// parse data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use('/api/v1/auth', jwtRoutes)

app.use('/auth', authRoutes)

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
app.use('/group-chat/', groupChatRoutes)
// app.use('/uploads', express.static('uploads'))
app.post(
  '/chat',
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { message } = req.body

    // Validate input
    if (!message || typeof message !== 'string') {
      return res
        .status(400)
        .json({ error: 'Message is required and must be a string' })
    }

    // Check if API key exists
    if (!process.env.GEMINI_API_KEY) {
      console.error('Missing GEMINI_API_KEY environment variable')
      return res.status(500).json({ error: 'AI service configuration error' })
    }

    const projectKnowledge = `
📌 About Acadizo:
Acadizo is a collaborative academic platform that bridges communication between teachers and students. 
It enables teachers to create academies, post modules, notices, and activities, while students can join 
academies, submit answers, and track their learning progress in an organized way.

🚀 Quick Guide:
- Joining an Academy: Navigate to the Academy page and select "Join".
- Creating an Academy: Teachers can go to Academy > Overview and click "Create Academy". 
  Note: Each teacher can create only one academy. To create or join another academy, 
  you must leave your current one.
- Posting a Module: Teachers can go to the Module page and click "Create Module".
- Posting a Notice: Teachers can go to the Notice page and click "Create Notice" to share announcements.
- Submitting an Answer: Students open the desired Activity and select "Submit Answer". 
  Note: Students can only see their own answers, but teachers can see all submissions.
- Viewing Activity Progress: Teachers can open an Activity to see submission statistics and student participation.
- Checking Deadlines: Students can view upcoming deadlines on the Activity details page.
- Editing Profile: Go to the top-right profile dropdown to update your information.
`

    try {
      console.log('Sending request to Gemini...')

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    text: `You are Acadizo's assistant. Here's what you need to know: ${projectKnowledge}\n\nUser: ${message}`,
                  },
                ],
              },
            ],
          }),
        },
      )

      const data = await response.json()
      console.log('Gemini response status:', response.status)

      if (!response.ok) {
        console.error('Gemini API Error:', response.status, data)

        if (response.status === 401) {
          return res
            .status(500)
            .json({ error: 'AI service authentication failed' })
        } else if (response.status === 429) {
          return res
            .status(500)
            .json({ error: 'AI service rate limit exceeded' })
        } else {
          return res.status(500).json({
            error: data.error?.message || 'AI service temporarily unavailable',
            details: data,
          })
        }
      }

      const reply =
        data.candidates?.[0]?.content?.parts?.[0]?.text || '⚠️ No reply'
      return res.json({ reply })
    } catch (err: any) {
      console.error('Chat endpoint error:', err)

      if (err.code === 'ENOTFOUND' || err.code === 'ECONNREFUSED') {
        return res.status(500).json({ error: 'Network connection failed' })
      }

      if (err.name === 'AbortError') {
        return res.status(500).json({ error: 'Request timeout' })
      }

      res.status(500).json({
        error: 'Internal server error',
        message:
          process.env.NODE_ENV === 'development' ? err.message : undefined,
      })
    }
  },
)

// --- Socket.IO setup ---
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      'https://acadizo.netlify.app',
    ],
  },
})

io.on('connection', socket => {
  console.log('User connected:', socket.id)

  // Join academy room
  socket.on('joinAcademy', (academyId: string) => {
    socket.join(academyId)
    console.log(`User joined academy ${academyId}`)
  })

  // Handle message send
  socket.on('sendMessage', async (data: any) => {
    const { academyId, sender, content } = data

    // Save to DB
    const message = await Chat.create({ academyId, sender, content })

    // Emit to all in academy room
    io.to(academyId).emit('receiveMessage', message)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})

app.get('/', async (req: Request, res: Response) => {
  res.send('working')
})
export default app
