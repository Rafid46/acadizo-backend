// import { Request, Response, NextFunction } from 'express'
// import jwt from 'jsonwebtoken'
// import dotenv from 'dotenv'

// declare module 'express' {
//   interface Request {
//     user?: any
//   }
// }

// dotenv.config()

// const secret = process.env.JWT_SECRET as string

// export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
//   const authHeader = req.headers.authorization

//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'Unauthorized access' })
//   }

//   const token = authHeader.split(' ')[1]

//   try {
//     const decoded = jwt.verify(token, secret)
//     // Optional: attach user info to request
//     req.user = decoded
//     next()
//   } catch (err) {
//     return res.status(403).json({ message: 'Forbidden: Invalid token' })
//   }
// }

import { Response, NextFunction } from 'express'
import { verifyJwt } from '../utils/jwt'

interface AuthRequest extends Request {
  cookies: {
    token: string
  }
  user?: {
    userId: string
    email: string
  }
}

export const authenticateUser = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies?.token
  if (!token) return res.status(401).json({ message: 'Not logged in' })

  try {
    const decoded = verifyJwt(token)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' })
  }
}
