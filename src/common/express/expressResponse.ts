import { Response } from 'express'

import { ResultType } from '../../types/shared'
import getResponseCode from './getResponseCode'

function sendResponse(response: Response, data: ResultType): Response {
  const responseCode: number = getResponseCode(data)

  return response.status(responseCode).send(data)
}

export default sendResponse
