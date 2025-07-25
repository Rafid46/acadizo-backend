// import multer, { StorageEngine } from 'multer'
// import path from 'path'
// import fs from 'fs'
// import express, { Application, Request, Response, NextFunction } from 'express'
// // Define the storage configuration
// // const storage: StorageEngine = multer.diskStorage({
// //   destination: function (
// //     req: Request,
// //     file: Express.Multer.File,
// //     cb: (error: Error | null, destination: string) => void,
// //   ) {
// //     cb(null, path.join(__dirname, '../../upload'))
// //   },
// //   filename: function (
// //     req: Request,
// //     file: Express.Multer.File,
// //     cb: (error: Error | null, filename: string) => void,
// //   ) {
// //     const uniqueName = `${Date.now()}-${file.originalname}`
// //     cb(null, uniqueName) // Set the file's name
// //   },
// // })
// const uploadDir = path.join(__dirname, '../../upload')
// const storage = multer.diskStorage({
//   destination: (
//     req: Request,
//     file: Express.Multer.File,
//     cb: (error: Error | null, destination: string) => void,
//   ) => {
//     cb(null, uploadDir)
//   },
//   filename: (
//     req: Request,
//     file: Express.Multer.File,
//     cb: (error: Error | null, destination: string) => void,
//   ) => {
//     cb(null, file.originalname.replace(/ /g, '_').toLowerCase())
//   },
// })
// export const upload = multer({ storage })
