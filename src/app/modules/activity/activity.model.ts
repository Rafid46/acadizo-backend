import { model, Model, Schema } from 'mongoose'
import { IActivity } from './activity.interface'
import Answers from './answers.model'

type ActivityModel = Model<IActivity, object>
const activitySchema = new Schema<IActivity>(
  {
    activityId: {
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
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    teacherId: {
      type: String,
      required: true,
    },
    activityTitle: {
      type: String,
      required: true,
    },
    activityDescription: {
      type: String,
      required: true,
    },
    // activityDate: {
    //   type: String,
    //   required: true,
    // },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    file: {
      type: String,
      default: null,
    },
    answers: [Answers.schema],
  },
  {
    timestamps: true,
  },
)

const Activity = model<IActivity, ActivityModel>('Activity', activitySchema)
export default Activity
export const createActivityInDb = async (activityData: IActivity) => {
  const activity = new Activity(activityData)
  await activity.save()
  return activity
}
