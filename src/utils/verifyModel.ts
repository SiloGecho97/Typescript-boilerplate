import _ from 'lodash'
import { Model, Document } from 'mongoose'

function verifyModel(
  modelList: Array<{ name: string }>,
  modelName: Model<Document>,
): boolean {
  if (!(modelName && modelList)) return false

  return _.some(modelList, (item) => item.name === modelName.modelName)
}

export default verifyModel
