import { Request, Response } from 'express'

import exceptionHandler from '../common/errorHandling/exceptionHandler'
import { create } from '../services/db'
import { PlayerRegister } from '../models'
import sendResponse from '../common/express/expressResponse'

/**
 * Add Player Event handler
 * @param req
 * @param res
 */
async function addPlayerRegister(
  req: Request,
  res: Response,
): Promise<Response> {
  const result = await exceptionHandler(create, PlayerRegister, req?.body)

  return sendResponse(res, result)
}

export default addPlayerRegister
