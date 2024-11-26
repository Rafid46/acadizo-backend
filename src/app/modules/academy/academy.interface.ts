interface IAcademyMember {
  id: string
  email: string
  // role: 'student' | 'teacher'
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
