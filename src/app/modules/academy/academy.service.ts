import { IAcademy } from './academy.interface'
import Academy from './academy.model'
import { generateAcademyId } from './academy.utils'

export const createAcademyToDb = async (
  academy: IAcademy,
): Promise<IAcademy | null> => {
  const academyId = await generateAcademyId()
  academy.academyId = academyId
  const createAcademy = await Academy.create(academy)
  return createAcademy
}

export const getAcademyFomDb = async (): Promise<IAcademy[]> => {
  const academy = await Academy.find()
  return academy
}
