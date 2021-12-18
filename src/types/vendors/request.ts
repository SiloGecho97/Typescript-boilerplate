/**
 * Defines Custom method types over Express's Request
 *
 */
import { Request } from 'express'

export interface RequestObject extends Request {
  user(): object
  logout(): void
}
