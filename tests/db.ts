import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import _ from 'lodash'

let mongoServer: MongoMemoryServer

export const connect = async () => {
  mongoServer = await MongoMemoryServer.create()
  const mongoUri = mongoServer.getUri()
  await mongoose.connect(mongoUri)
}

export const closeDatabase = async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await mongoServer.stop()
}

export const clearDatabase = async () => {
  const { collections } = mongoose.connection

  _.map(Object.values(collections), async (val) => {
    const collection = val
    await collection.deleteMany({})
  })
}
