import _ from 'lodash'

import { ResultType } from '../../types/shared'
import CONSTANTS from '../constant'

function getResponseCode(data: ResultType): number {
  return _.get(data, 'success', null)
    ? CONSTANTS.REQUEST_CREATED
    : _.get(data, 'error.code', CONSTANTS.REQUEST_BAD_REQUEST)
}

export default getResponseCode
