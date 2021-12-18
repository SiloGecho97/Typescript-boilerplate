import _ from 'lodash'

import request from './index'
import * as dbHandler from '../db'

beforeAll(async () => {
  await dbHandler.connect()
})

afterEach(async () => {
  await dbHandler.clearDatabase()
})

afterAll(async () => {
  await dbHandler.closeDatabase()
})

describe('AddRetailer API', () => {
  it('tests /customer/add-area invalid request body endpoints', async () => {
    const response = await request.post('/customer/add-area').send({
      eventName: 'API test',
      eventTime: new Date(),
      areaId: '321',
      name: 'Name API',
    })

    expect.assertions(2)
    expect(_.get(response, 'body.name', -1)).toEqual('Bad Request')
    expect(_.get(response, 'status', -1)).toEqual(400)
  })

  it('tests /customer/add-area endpoints', async () => {
    const response = await request.post('/customer/add-area').send({
      eventName: 'CustomerRegister',
      eventTime: new Date(),
      areaId: '5emh/t5chEyN8S68yG1Rug==a',
      name: 'xotto-area-1',
    })

    expect.assertions(3)
    expect(_.get(response, 'status', -1)).toEqual(201)
    expect(_.get(response, 'body.data.eventName', -1)).toEqual(
      'CustomerRegister',
    )
    expect(_.get(response, 'body.data.areaId', -1)).toEqual(
      '5emh/t5chEyN8S68yG1Rug==a',
    )
  })
})
