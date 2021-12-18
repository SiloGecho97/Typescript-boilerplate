import _ from 'lodash'
import { Request, Response, Router } from 'express'

import routes from './routes'

// Initialize express Router
const router = Router()

// First Event router
_.map(routes, (route) => router.post(route.path, route.controller))

router.get('*', (_req: Request, res: Response) => {
  res.status(404).send({ code: 404, message: 'Not Found' })
})

export default router
