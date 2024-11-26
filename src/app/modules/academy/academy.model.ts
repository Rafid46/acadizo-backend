import { Model, model, Schema } from 'mongoose'
import { IAcademy } from './academy.interface'

type AcademyModel = Model<IAcademy, Object>

const academySchema = new Schema<IAcademy>(
  {
    academyId: {
      type: String,
      required: true,
      unique: true,
    },
    academyName: {
      type: String,
      required: true,
      unique: true,
    },
    academyDescription: {
      type: String,
    },
    academyNumber: {
      type: String,
    },
    academyMembers: {
      type: [String],
    },
    academyIcon: {
      type: String,
    },
    academyCreatedBy: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

const Academy = model<IAcademy, AcademyModel>('Academy', academySchema)
export default Academy
export const createAcademyInDb = async (academyData: IAcademy) => {
  const academy = new Academy(academyData)
  await academy.save()
  return Academy
}
