import { generateNoticeId } from './academy.utils'
import { INotice } from './notice.interface'
import Notice from './notice.model'

export const createNoticeInDb = async (
  notice: INotice,
): Promise<INotice | null> => {
  const noticeId = await generateNoticeId()
  notice.noticeId = noticeId
  const createNotice = await Notice.create(notice)
  return createNotice
}

export const getNoticeFomDb = async (): Promise<INotice[]> => {
  const notices = await Notice.find()
  return notices
}
