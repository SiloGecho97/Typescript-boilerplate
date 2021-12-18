import { Model, Document } from 'mongoose'
import _ from 'lodash'
import { find, updateOne } from '../services/db'
import models from '../models'
import exceptionHandler from '../common/errorHandling/exceptionHandler'
import FileSystem from './FileSystemHandler'
import constructSortKey from './generateSortKey'
import { Written } from '../types/vendors/objectKey'
import constants from '../common/constant'

interface UnwittenData {
  modelName: Model<Document>
  data: object
}

/**
 * Get un written data from database
 * @param ModelName
 * @returns
 */
function getUnwrittenData(ModelName: Model<Document>): Promise<string> {
  return new Promise((resolve, reject) => {
    exceptionHandler(find, ModelName, { written: false })
      .then((resp) => {
        if (_.isEmpty(resp.data) || !resp.success) resolve('')
        resolve(JSON.stringify(resp.data))
      })
      .catch((err) => reject(err))
  })
}

/**
 * Updating the database after file system
 * @param data
 */
function updateDatabase(data: UnwittenData[]) {
  return Promise.all(
    data.map(async (item) => {
      await exceptionHandler(
        updateOne,
        item.modelName,
        {
          _id: _.get(item.data, '_id'),
        },
        { written: true },
      )
      return true
    }),
  )
}

/**
 * Prepare data to write to file
 * Remove unneccesary data
 * @param data
 * @returns
 */
function prepareDataToWrite(data: UnwittenData[]): string {
  const tobeWritten: Written = {}
  for (let i = 0; i <= data.length - 1; ) {
    tobeWritten[i] = _.omit(data[i].data, ['__v', '_id', 'written'])
    i += 1
  }
  return JSON.stringify(tobeWritten)
}

/**
 * Mirror Database to File
 * This will infinitly fetch data from database to file.
 * @returns
 */
async function mirrorDatabaseToFile() {
  return Promise.all(
    models.map(async (modelName) => {
      const unWrittenData: UnwittenData[] = []
      try {
        // Get un written data form database
        const unWrittenDatafetched = await getUnwrittenData(modelName)
        if (
          _.isEmpty(unWrittenDatafetched) ||
          unWrittenDatafetched.length === 0
        ) {
          return {
            message: 'No data to write',
            written: false,
          }
        }

        const dbUnwrittenData = JSON.parse(unWrittenDatafetched)

        // wait untill all data processed.
        // Iterator over un written data push to array untill
        await Promise.all(
          dbUnwrittenData.map(async (item: object, index: number) => {
            unWrittenData.push({
              modelName,
              data: item,
            })
            // TODO: This if condition maybe improved
            if (
              unWrittenData.length >= 100 ||
              (index === dbUnwrittenData.length - 1 &&
                unWrittenData.length >= 1)
            ) {
              const sortKey = constructSortKey()
              const objectData = prepareDataToWrite(unWrittenData)
              const fileSystem = new FileSystem()
              // Write Event to File
              const fileSave = await fileSystem.saveEvent(
                sortKey.fileName,
                sortKey.directoryName,
                objectData,
                sortKey.sortKey,
              )
              if (!fileSave) {
                throw Error('Failed to Save to File')
              }
              // Update the database
              await updateDatabase(unWrittenData)
            }
          }),
        )
        return {
          message: `Successfull written`,
          written: true,
        }
      } catch (err) {
        throw Error(`Failed to Mirror db to file`)
      }
    }),
  )
}

export default function infiniteLoopRecursion() {
  const executeFuction = new Promise((resolve, reject) => {
    mirrorDatabaseToFile()
      .then((data) => {
        resolve(data)
      })
      .catch((err) => reject(err))
  })

  // 5 second setIterval for recursion function,
  // This function add delay/pause for 5 sec if executeFunction resolve quickly
  const timeOutPromise = new Promise((resolve) => {
    setTimeout(resolve, constants.FILE_RECHECK_TIME, 'Recheck')
  })

  Promise.all([executeFuction, timeOutPromise])
    .then((values) => {
      // TODO; this will console.log be removed later
      // eslint-disable-next-line no-console
      console.log(
        values ||
          `Rechecking the Database Every ${constants.FILE_RECHECK_TIME} minutes`,
      )
      infiniteLoopRecursion()
    })
    .catch((err) => {
      // TODO; this console.log will be removed later
      // eslint-disable-next-line no-console
      console.log(err || 'Rechecking the database after err')
      infiniteLoopRecursion()
    })
}
