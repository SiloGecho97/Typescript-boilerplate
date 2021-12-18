import _ from 'lodash'

import { ResultType } from '../../types/shared'
import {
  DUPLICATION_ERROR,
  MISSING_REQUIRED_FIELD,
  SOMETHING_WENT_WRONG_FUNCTION,
} from './errorTypes'

function exceptionHandlerErrorFilter(error: unknown) {
  const message = _.get(error, 'message', '')

  if (message.includes('duplicate key error'))
    return DUPLICATION_ERROR(
      Object.keys(_.get(error, 'keyValue', 'UNIDENTIFIED_POSITION')),
    )

  if (message.includes('is required')) {
    const obj = _.get(error, 'errors', { '0': 'Missing required field' })
    return MISSING_REQUIRED_FIELD(obj[Object.keys(obj)[0]])
  }

  return SOMETHING_WENT_WRONG_FUNCTION(
    message,
    _.get(error, 'description', undefined),
  )
}

async function exceptionHandler(
  // eslint-disable-next-line @typescript-eslint/ban-types
  func: Function,
  ...args: Array<object>
): Promise<ResultType> {
  try {
    const data = await func(...args)
    return { data, success: true, error: undefined }
  } catch (e) {
    const error = exceptionHandlerErrorFilter(e)
    return { error, success: false, data: undefined }
  }
}

export default exceptionHandler
