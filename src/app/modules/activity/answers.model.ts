import { model, Model, Schema } from 'mongoose'
import { IAnswers } from './activity.interface'

type AnswerModel = Model<IAnswers, object>
const answerSchema = new Schema<IAnswers, object>(
  {
    answersId: {
      type: String,
      required: true,
    },
    activityId: {
      type: String,
      required: true,
    },
    academyName: {
      type: String,
      required: true,
    },
    // firstName: {
    //   type: String,
    //   required: true,
    // },
    // lastName: {
    //   type: String,
    //   required: true,
    // },
    // studentId: {
    //   type: String,
    //   required: true,
    // },
    // studentEmail: {
    //   type: String,
    //   required: true,
    // },
    student: {
      type: Schema.Types.Mixed,
      required: true,
    },

    answerDescription: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
)

const Answers = model<IAnswers, AnswerModel>('Answers', answerSchema)
export default Answers
export const createAnswerInDb = async (answerData: IAnswers) => {
  const answer = new Answers(answerData)
  await answer.save()
  return answer
}
