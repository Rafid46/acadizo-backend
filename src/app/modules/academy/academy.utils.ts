import Academy from './academy.model'

export const findLastAcademyId = async () => {
  const lastAcademy = await Academy.findOne({}, { academyId: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()
  return lastAcademy?.academyId
}

export const generateAcademyId = async () => {
  const currentId =
    (await findLastAcademyId()) || (0).toString().padStart(3, '0')
  const incrementId = (parseInt(currentId) + 1).toString().padStart(3, '0')
  return incrementId
}
