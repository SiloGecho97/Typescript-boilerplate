import { ErrorType } from '../../types/shared'

const MUST_AUTHENTICATE_MESSAAGE = 'MUST_AUTHENTICATE'
const DUPLICATION_ERROR_MESSAGE = 'DUPLICATION_ERROR'
const MISSING_REQUIRED_FIELD_MESSAGE = 'MISSING_REQUIRED_FIELD'
const NOT_FOUND_MESSAGE = 'NOT_FOUND'
const SOMETHING_WENT_WRONG_MESSAGE = 'SOMETHING_WENT_WRONG'
const SOMETHING_WENT_WRONG_DESCRIPTION = 'Something unexpected just happened!'
const MODEL_INVALID_MESSAGE = 'MODEL_INVALID'

export const AUTHENTICATION_ERROR: ErrorType = {
  code: 401,
  message: MUST_AUTHENTICATE_MESSAAGE,
  description: 'Authentication failed',
}

export const MODEL_INVALID: ErrorType = {
  code: 500,
  message: MODEL_INVALID_MESSAGE,
  description: 'Model name missing or invalid',
}

export const RECORD_NOT_FOUND: ErrorType = {
  code: 404,
  message: NOT_FOUND_MESSAGE,
  description: 'Record not found',
}

export const SOMETHING_WENT_WRONG: ErrorType = {
  code: 400,
  message: SOMETHING_WENT_WRONG_MESSAGE,
  description: 'Something unexpected just happened!',
}

export const SOMETHING_WENT_WRONG_FUNCTION = (
  message?: string,
  description?: string,
): ErrorType => ({
  code: 400,
  message: message || SOMETHING_WENT_WRONG_MESSAGE,
  description: description || SOMETHING_WENT_WRONG_DESCRIPTION,
})

export const DUPLICATION_ERROR = (key: string | string[]): ErrorType => ({
  code: 400,
  message: DUPLICATION_ERROR_MESSAGE,
  description: `Record already exists. Duplication at key: ${key}`,
})

export const MISSING_REQUIRED_FIELD = (description: string): ErrorType => ({
  code: 422,
  message: MISSING_REQUIRED_FIELD_MESSAGE,
  description,
})
