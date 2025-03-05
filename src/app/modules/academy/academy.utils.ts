import Academy from './academy.model'
import Notice from './notice.model'

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

// notice id generation
export const findLastNoticeId = async () => {
  const lastNotice = await Notice.findOne({}, { academyId: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()
  return lastNotice?.noticeId
}

export const generateNoticeId = async () => {
  const currentId =
    (await findLastNoticeId()) || (0).toString().padStart(3, '0')
  const incrementId = (parseInt(currentId) + 1).toString().padStart(3, '0')
  return incrementId
}
