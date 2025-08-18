// import express from 'express'

// import { Request, Response } from 'express'
// import { createJwt } from '../../../utils/jwt'

// const router = express.Router()

// router.post('/jwt', async (req: Request, res: Response): Promise<any> => {
//   const user = req.body // should contain at least email

//   if (!user?.email) {
//     return res.status(400).json({ message: 'Email is required' })
//   }

//   const token = await createJwt(user)
//   res.status(200).json({ token })
// })

// export default router

import { Router } from 'express'
import { loginUser, logoutUser, registerUser } from './auth.controller'

const router = Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)

export default router
