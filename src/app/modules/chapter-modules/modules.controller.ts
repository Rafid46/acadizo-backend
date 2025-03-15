import { NextFunction, Request, Response } from 'express'
import { IModules } from './modules.interface'
import { createModulesInDb, getModulesFromDB } from './modules.service'
import Modules from './modules.model'

export const createModule = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const { description, title, heading, academyName, academyId } = req.body
    console.log('request body', req.body)
    console.log('Academy ID:', academyId, 'Academy Name:', academyName)
    const file = req.file
    console.log('Request file:', req.file)
    if (!academyName || !academyId) {
      return res
        .status(400)
        .json({ status: 'error', message: 'missing academyName or academyId' })
    }
    const data: IModules = {
      description,
      title,
      heading,
      academyName,
      academyId,
      file: (file && file.filename) || null,
    } as IModules
    const modules = await createModulesInDb(data)
    res.status(200).json({ status: 'success', data: modules })
  } catch (error) {
    next(error)
  }
}

export const getModules = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const allModules = await getModulesFromDB()
  res.status(200).json({
    status: 'success',
    data: allModules,
  })
}

export const deleteModule = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { moduleId } = req.params
    console.log('Module ID', moduleId)
    if (!moduleId) {
      res.status(400).json({
        status: 'fail',
        message: 'module id is not found',
      })
    }

    const deletedModule = await Modules.findOneAndDelete({ moduleId })
    if (!deletedModule) {
      res.status(404).json({
        status: 'fail',
        message: 'module not found',
      })
    }
    res.status(200).json({
      status: 'success',
      message: 'module deleted',
      data: deletedModule,
    })
  } catch (error) {
    return next(error)
  }
}

// delete many
export const deleteModules = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const { academyId, moduleIds } = req.body
    if (!moduleIds || !academyId) {
      res.status(400).json({
        status: 'fail',
        message: 'missing academyId and moduleId',
      })
    }
    if (!moduleIds?.length) {
      res.status(400).json({
        status: 'fail',
        message: 'no modules to delete',
      })
    }

    const deleteAllModules = await Modules?.deleteMany({
      academyId: academyId,
      moduleId: { $in: moduleIds },
    })
    return res.status(200).json({
      status: 'success',
      data: deleteAllModules,
      message: 'all modules deleted successfully',
    })
  } catch (error) {
    return next(error)
  }
}
