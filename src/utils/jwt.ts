// import jwt, { SignOptions } from 'jsonwebtoken'
// const secret = process.env.JWT_SECRET
// if (!secret) {
//   throw new Error('JWT_SECRET is not defined in environment variables')
// }

// export const generateTokenAsync = (
//   payload: Record<string, unknown>,
//   expiresIn: SignOptions['expiresIn'] = '7d',
// ): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     jwt.sign(payload, secret, { expiresIn }, (err, token) => {
//       if (err || !token) reject(err)
//       else resolve(token)
//     })
//   })
// }

// export const verifyToken = (token: string) => {
//   return jwt.verify(token, secret)
// }
import jwt from 'jsonwebtoken'

type TokenPayload = {
  userId: string
  email: string
}

export const createJwt = (payload: TokenPayload): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET!,
      {
        expiresIn: process.env.JWT_TIMEOUT || '1d',
      },
      (err, token) => {
        if (err || !token) reject(err)
        else resolve(token)
      },
    )
  })
}

export const verifyJwt = (token: string): TokenPayload => {
  return jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload
}
