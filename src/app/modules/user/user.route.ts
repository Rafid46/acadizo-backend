import express from 'express'
import {
  createUser,
  getUsers,
  getUsersById,
  updateUser,
} from './user.controller'
import { handleJoinAcademy } from './joinAcademy.controller'
import { handleLeaveAcademy } from './leaveAcademy.controller'
const router = express.Router()

router.get('/', getUsers)
router.get('/:email', getUsersById)
router.post('/create-user', createUser)
router.put('/update-user/:email', updateUser)
router.post('/join-academy', handleJoinAcademy)
router.post('/leave-academy', handleLeaveAcademy)

export default router
