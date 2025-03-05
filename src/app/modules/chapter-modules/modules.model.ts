import { model, Model, Schema } from 'mongoose'
import { IModules } from './modules.interface'

type ModuleModel = Model<IModules, object>
const modulesSchema = new Schema<IModules>(
  {
    modulesId: {
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
    heading: {
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
    file: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
)

const Modules = model<IModules, ModuleModel>('Modules', modulesSchema)
export default Modules
export const createModuleInDb = async (moduleData: IModules) => {
  const modules = new Modules(moduleData)
  await modules.save()
  return modules
}
