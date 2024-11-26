import { getAcademy } from './academy.controller'
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

export const getAcademyByEmailFromDb = async (
  payload: string,
): Promise<IAcademy | null> => {
  try {
    const academy = await Academy.findOne({ academyCreatedBy: payload })
    return academy
  } catch (error) {
    throw new Error('error etching academy')
  }
}
