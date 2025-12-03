import mongoose, { Schema } from 'mongoose'
import { IGroupChat, IGroupMember, IGroupMessage } from './groupChat.interface'

const groupMemberSchema = new Schema<IGroupMember>({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['student', 'teacher'], required: true },
  joinedAt: { type: Date, default: Date.now },
  photoURL: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
})

const groupMessageSchema = new Schema<IGroupMessage>({
  messageId: { type: String, required: true },
  sender: {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: ['student', 'teacher'], required: true },
    photoURL: { type: String, required: true },
  },
  content: { type: String, required: true },
  messageType: { 
    type: String, 
    enum: ['text', 'image', 'file', 'audio'], 
    default: 'text' 
  },
  attachments: [{
    fileName: { type: String },
    fileUrl: { type: String },
    fileType: { type: String },
    fileSize: { type: Number },
  }],
  replyTo: {
    messageId: { type: String },
    senderName: { type: String },
    content: { type: String },
  },
  reactions: [{
    userId: { type: String },
    reaction: { type: String },
  }],
  isEdited: { type: Boolean, default: false },
  editedAt: { type: Date },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
}, { timestamps: true })

const groupChatSchema = new Schema<IGroupChat>({
  groupId: { type: String, required: true, unique: true },
  groupName: { type: String, required: true },
  groupDescription: { type: String },
  groupIcon: { type: String },
  academyId: { type: String, required: true },
  academyName: { type: String, required: true },
  createdBy: { type: String, required: true },
  members: [groupMemberSchema],
  messages: [groupMessageSchema],
  isActive: { type: Boolean, default: true },
  settings: {
    allowMemberInvite: { type: Boolean, default: true },
    allowMessageEdit: { type: Boolean, default: true },
    allowMessageDelete: { type: Boolean, default: true },
    allowFileSharing: { type: Boolean, default: true },
  },
}, { timestamps: true })

// Indexes for better query performance
groupChatSchema.index({ academyId: 1 })
groupChatSchema.index({ 'members.userId': 1 })
groupChatSchema.index({ groupId: 1 })

const GroupChat = mongoose.model<IGroupChat>('GroupChat', groupChatSchema)
export default GroupChat 