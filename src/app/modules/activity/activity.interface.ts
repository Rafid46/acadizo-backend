import { IUser } from '../user/user.interface'

export type IActivity = {
  activityId: string
  academyId: string
  academyName: string
  firstName: string
  lastName: string
  teacherId: string
  activityTitle: string
  activityDescription: string
  file: string
  // activityDate: string
  startDate: Date
  endDate: Date
  answers: IAnswers[]
}

export type IAnswers = {
  answersId: string
  activityId: string
  academyId: string
  academyName: string
  // firstName: string
  // lastName: string
  // // studentName: string
  // studentId: string
  // studentEmail: string
  answerDescription: string
  file: string
  student: IUser[]
}
