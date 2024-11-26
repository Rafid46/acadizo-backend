import express from 'express'
import {
  createUser,
  getUsers,
  getUsersById,
  updateUser,
} from './user.controller'
import { handleJoinAcademy } from './joinAcademy.controller'
const router = express.Router()

router.get('/', getUsers)
router.get('/:email', getUsersById)
router.post('/create-user', createUser)
router.put('/update-user/:email', updateUser)
router.post('/join-academy', handleJoinAcademy)

export default router
