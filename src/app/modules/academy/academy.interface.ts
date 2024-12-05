interface IAcademyMember {
  id: string
  email: string
  role: 'student' | 'teacher'
  createdAt: string
  firstName: string
  lastName: string
}

export type IAcademy = {
  academyId: string
  academyName: string
  academyDescription: string
  academyNumber: string
  academyMembers: IAcademyMember[]
  academyIcon: string
  academyCreatedBy: string
}
