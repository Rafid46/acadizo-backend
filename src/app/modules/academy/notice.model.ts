import { INotice } from './notice.interface'
import { Model, model, Schema } from 'mongoose'

type NoticeModel = Model<INotice, Object>

const noticeSchema = new Schema<INotice>(
  {
    noticeId: {
      type: String,
      required: true,
    },
    academyId: {
      type: String,
      required: true,
    },
    academyName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    file: { type: String, default: null },
  },
  {
    timestamps: true,
  },
)

const Notice = model<INotice, NoticeModel>('Notice', noticeSchema)
export default Notice
export const createNoticeInDb = async (noticeData: INotice) => {
  const notice = new Notice(noticeData)
  await notice.save()
  return Notice
}
