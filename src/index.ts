import express, { Application, NextFunction, Request, Response } from 'express'
import swaggerUi from 'swagger-ui-express'
import * as OpenApiValidator from 'express-openapi-validator'
import morgan from 'morgan'
import mongoose from 'mongoose'
import swaggerDocument from './docs/index'
import { url } from './config/db'
import router from './routes'
import { OpenApiValidationError } from './types/shared'
import infiniteLoopRecursion from './utils/mirrorDatabaseToFile'

const app: Application = express()
const apiDoc = JSON.parse(swaggerDocument)
// console.log(swaggerDocument);
const PORT: string | number = process.env.PORT || 3000

app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiDoc, { explorer: true }))

app.use(morgan('tiny'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  OpenApiValidator.middleware({
    apiSpec: apiDoc,
    validateRequests: true, // (default)
    validateResponses: true, // false by default
  }),
)

app.use(router)

app.use(
  (
    err: OpenApiValidationError,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction,
  ) => {
    res.status(err.status || 500).json({ name: err.name, message: err.message })
  },
)

/* eslint-disable no-console */
if (process.env.NODE_ENV !== 'test') {
  mongoose
    .connect(url)
    .then(() => {
      app.listen(PORT, (): void =>
        console.log(
          `Running Template on port ${PORT} \nAPI Documentation at ${PORT}/docs!`,
        ),
      )
      infiniteLoopRecursion()
    })
    .catch((err) => console.log(err))
}

/* eslint-enable no-console */

export default app
