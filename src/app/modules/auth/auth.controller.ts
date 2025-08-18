import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import User from '../user/user.model'
import { createJwt } from '../../../utils/jwt'

export const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const hashed = await bcrypt.hash(password, 10)

  const user = await User.create({ email, password: hashed })

  res.status(201).json({ msg: 'Registered', user })
}

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const token = createJwt({ userId: user.id, email: user.email })

  res.cookie('token', token, {
    maxAge: 86400000,
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  })

  res.status(200).json({ msg: 'Logged in', email: user.email })
}

export const logoutUser = async (_: Request, res: Response) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    expires: new Date(),
  })
  res.status(200).json({ msg: 'Logged out' })
}
