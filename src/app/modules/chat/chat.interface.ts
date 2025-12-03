export type IChat = {
  academyId: string
  academyName: string
  sender: {
    id: string
    name: string
    role: 'teacher' | 'student'
  }
  content: string
}
