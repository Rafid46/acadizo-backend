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
  activityDate: string
  answers: IAnswers[]
}

export type IAnswers = {
  answersId: string
  activityId: string
  academyId: string
  academyName: string
  // studentName: string
  studentId: string
  answerDescription: string
  file: string
}
