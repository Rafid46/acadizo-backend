import { model, Schema, Model } from 'mongoose'
import { IUser } from './user.interface'

type UserModel = Model<IUser, object>

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['student', 'teacher'],
      // required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contactNo: {
      type: String,
    },
    photoURL: {
      type: String,
    },
    academyName: {
      type: String,
      default: ' ',
    },
    academyId: {
      type: String,
      default: ' ',
    },
    createdAcademy: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

const User = model<IUser, UserModel>('User', userSchema)
export default User
export const createUserInDb = async (userData: IUser) => {
  const user = new User(userData)
  await user.save()
  return user
}
