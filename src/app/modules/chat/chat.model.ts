import mongoose, { Schema } from 'mongoose'
import { IChat } from './chat.interface'

const messageSchema = new Schema<IChat>(
  {
    academyName: { type: String, required: true },
    academyId: { type: String, required: true },
    sender: {
      id: { type: String, required: true },
      name: { type: String, required: true },
      role: { type: String, enum: ['teacher', 'student'], required: true },
    },
    content: { type: String, required: true },
  },
  { timestamps: true },
)

const Chat = mongoose.model<IChat>('Chat', messageSchema)
export default Chat
