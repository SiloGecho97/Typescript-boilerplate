import { Request, Response } from 'express'

import exceptionHandler from '../common/errorHandling/exceptionHandler'
import { create } from '../services/db'
import { AddRetailer } from '../models'
import sendResponse from '../common/express/expressResponse'

/**
 * AddRetailer Event Handler
 * @param req
 * @param res
 */
async function addRetailer(req: Request, res: Response): Promise<Response> {
  const resp = await exceptionHandler(create, AddRetailer, req?.body)

  return sendResponse(res, resp)
}

export default addRetailer
