import { Document } from 'mongoose'
import { Request, Response } from 'express'

export interface RouteType {
  path: string
  controller: (req: Request, res: Response) => Promise<Response>
}

export interface ErrorType {
  code: number
  message: string
  description: string
}

export interface ResultType {
  success: boolean
  data: object | Array<object> | undefined
  error: ErrorType | undefined
}

export interface OpenApiValidationError {
  status: number
  message: string
  error?: string
  name: string
}

export interface DbDocument extends Document {
  _id: string
}
