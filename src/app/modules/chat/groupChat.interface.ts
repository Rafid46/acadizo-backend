export interface IGroupMember {
  userId: string
  name: string
  role: 'student' | 'teacher'
  joinedAt: Date
  photoURL: string
  isAdmin: boolean
}

export interface IGroupMessage {
  messageId: string
  sender: {
    userId: string
    name: string
    role: 'student' | 'teacher'
    photoURL: string
  }
  content: string
  messageType: 'text' | 'image' | 'file' | 'audio'
  attachments?: {
    fileName: string
    fileUrl: string
    fileType: string
    fileSize: number
  }[]
  replyTo?: {
    messageId: string
    senderName: string
    content: string
  }
  reactions?: {
    userId: string
    reaction: string
  }[]
  isEdited: boolean
  editedAt?: Date
  isDeleted: boolean
  deletedAt?: Date
}

export interface IGroupChat {
  groupId: string
  groupName: string
  groupDescription?: string
  groupIcon?: string
  academyId: string
  academyName: string
  createdBy: string
  createdAt: Date
  updatedAt: Date
  members: IGroupMember[]
  messages: IGroupMessage[]
  isActive: boolean
  settings: {
    allowMemberInvite: boolean
    allowMessageEdit: boolean
    allowMessageDelete: boolean
    allowFileSharing: boolean
  }
}

export interface ICreateGroupRequest {
  groupName: string
  groupDescription?: string
  groupIcon?: string
  academyId: string
  academyName: string
  memberIds: string[]
}

export interface IUpdateGroupRequest {
  groupName?: string
  groupDescription?: string
  groupIcon?: string
  settings?: Partial<IGroupChat['settings']>
}

export interface IAddMemberRequest {
  userId: string
  name: string
  role: 'student' | 'teacher'
  photoURL: string
  isAdmin?: boolean
}

export interface ISendMessageRequest {
  content: string
  messageType?: 'text' | 'image' | 'file' | 'audio'
  attachments?: {
    fileName: string
    fileUrl: string
    fileType: string
    fileSize: number
  }[]
  replyTo?: {
    messageId: string
    senderName: string
    content: string
  }
} 