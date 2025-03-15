import { IModules } from './modules.interface'
import Modules from './modules.model'
import { generateModulesId } from './modules.utils'

export const createModulesInDb = async (
  module: IModules,
): Promise<IModules | null> => {
  const moduleId = await generateModulesId()
  module.moduleId = moduleId
  const createModules = await Modules.create(module)
  return createModules
}

export const getModulesFromDB = async (): Promise<IModules[]> => {
  const modules = await Modules.find()
  return modules
}
