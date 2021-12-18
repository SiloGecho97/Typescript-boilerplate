import { DeleteResult, UpdateResult } from 'mongodb'
import { Model, Document } from 'mongoose'

import { DbDocument, ErrorType } from '../../types/shared'
import dbModels from '../../common/models'
import {
  MODEL_INVALID,
  RECORD_NOT_FOUND,
} from '../../common/errorHandling/errorTypes'
import verifyModel from '../../utils/verifyModel'

export async function find(
  modelName: Model<Document>,
  query: object,
): Promise<DbDocument[] | ErrorType> {
  if (!verifyModel(dbModels, modelName)) throw MODEL_INVALID

  const result = await modelName.find(query || {})
  return result
}

export async function findOne(
  modelName: Model<Document>,
  query: object,
): Promise<DbDocument | ErrorType> {
  if (!verifyModel(dbModels, modelName)) throw MODEL_INVALID

  const result = await modelName.findOne(query || {})
  if (!result) throw RECORD_NOT_FOUND

  return result
}

export async function create(
  modelName: Model<Document>,
  args: object,
): Promise<DbDocument | ErrorType> {
  if (!verifyModel(dbModels, modelName)) throw MODEL_INVALID

  const result = await modelName.create(args)
  return result
}

export async function createBulk(
  modelName: Model<Document>,
  args: object[],
): Promise<DbDocument[] | ErrorType> {
  if (!verifyModel(dbModels, modelName)) throw MODEL_INVALID

  const result = await modelName.insertMany(args)
  return result
}

export async function updateOne(
  modelName: Model<Document>,
  condition: object,
  args: object,
  options?: object,
): Promise<DbDocument | ErrorType> {
  if (!verifyModel(dbModels, modelName)) throw MODEL_INVALID

  const result = await modelName.findOneAndUpdate(condition, args, options)
  if (!result) throw RECORD_NOT_FOUND

  return result
}

export async function updateMany(
  modelName: Model<Document>,
  condition: object,
  args: object,
): Promise<UpdateResult | ErrorType> {
  if (!verifyModel(dbModels, modelName)) throw MODEL_INVALID

  const result = await modelName.updateMany(condition, args)
  if (!result) throw RECORD_NOT_FOUND

  return result
}

export async function upsert(
  modelName: Model<Document>,
  condition: object,
  args: object,
  options?: object,
): Promise<DbDocument | ErrorType | null> {
  if (!verifyModel(dbModels, modelName)) throw MODEL_INVALID

  const result = await modelName.findOneAndUpdate(condition, args, {
    upsert: true,
    ...options,
  })

  return result
}

export async function deleteOne(
  modelName: Model<Document>,
  condition: object,
): Promise<DeleteResult | ErrorType> {
  if (!verifyModel(dbModels, modelName)) throw MODEL_INVALID

  const result = await modelName.deleteOne(condition)
  return result
}

export async function deleteMany(
  modelName: Model<Document>,
  condition: object,
): Promise<DeleteResult | ErrorType> {
  if (!verifyModel(dbModels, modelName)) throw MODEL_INVALID

  const result = await modelName.deleteMany(condition)
  return result
}
