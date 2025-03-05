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
    academyMembers: [
      {
        id: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        role: {
          type: String,
        },
        firstName: {
          type: String,
        },
        lastName: {
          type: String,
        },
        photoURL: {
          type: String,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        updatedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
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
