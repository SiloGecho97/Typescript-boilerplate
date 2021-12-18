import supertest from 'supertest'
import app from '../../src'

const request = supertest(app)

export default request
