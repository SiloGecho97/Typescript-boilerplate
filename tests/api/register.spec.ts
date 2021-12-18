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

describe('Register API', () => {
  it('tests /retailer/register invalid  request body endpoints', async () => {
    const staticDate = new Date()
    const params = {
      eventName: 'API test',
      eventTime: staticDate,
      playerId: '321',
      username: 'Name API',
      postCode: '123',
      place: 'Here',
      area: 'Space Moon',
      country: 'Sky Fall',
      citizenship: 'Universal',
      street: 'Thug Lyf',
      number: '987',
      brithDate: staticDate,
      brithLocation: 'Heaven',
      brithName: 'Lupin',
      automaticProfitTransactionmoneyAmount: '123',
    }
    const response = await request.post('/retailer/register').send(params)

    expect.assertions(2)
    expect(_.get(response, 'body.name', -1)).toEqual('Bad Request')
    expect(_.get(response, 'status', -1)).toEqual(400)
  })
  it('tests /retailer/register invalid data types request body endpoints', async () => {
    const params = {
      eventName: 'PlayerRegistration',
      eventTime: '2021-01-26T09:37:37Z',
      playerId: 'cbc5c00a-486d-11ec-81d3-0242ac130003',
      username: 'janeDoe12',
      fullName: 'Jane Doe',
      postCode: '12345',
      place: 'Berlin,Germany',
      area: '12345',
      country: 'Germany',
      citizenship: 'American',
      street: 'Berlin,Germany',
      number: 245,
      brithDate: '2021-01-26 09:12', // invalid date
      brithLocation: 'Berlin,Germany',
      brithName: 'John Doe',
      status: true,
      automaticProfitTransactionmoneyAmount: '23.011', // invalid decimal
    }
    const response = await request.post('/retailer/register').send(params)

    expect.assertions(2)
    expect(_.get(response, 'body.name', -1)).toEqual('Bad Request')
    expect(_.get(response, 'status', -1)).toEqual(400)
  })
  it('tests /retailer/register endpoints', async () => {
    const params = {
      eventName: 'PlayerRegistration',
      eventTime: '2021-01-26T09:37:37Z',
      playerId: 'cbc5c00a-486d-11ec-81d3-0242ac130003',
      username: 'janeDoe12',
      fullName: 'Jane Doe',
      postCode: '12345',
      place: 'Berlin,Germany',
      area: '12345',
      country: 'Germany',
      citizenship: 'American',
      street: 'Berlin,Germany',
      number: 245,
      brithDate: '2021-01-26',
      brithLocation: 'Berlin,Germany',
      brithName: 'John Doe',
      status: true,
      automaticProfitTransactionmoneyAmount: '23.01',
    }
    const response = await request.post('/retailer/register').send(params)

    expect(_.get(response, 'body.data.eventName', -1)).toEqual(
      'PlayerRegistration',
    )
    expect(_.get(response, 'body.data.playerId', -1)).toEqual(
      'cbc5c00a-486d-11ec-81d3-0242ac130003',
    )
    expect(_.get(response, 'body.data.username', -1)).toEqual('janeDoe12')
    expect(_.get(response, 'body.data.postCode', -1)).toEqual('12345')
    expect(_.get(response, 'body.data.place', -1)).toEqual('Berlin,Germany')
    expect(_.get(response, 'body.data.area', -1)).toEqual('12345')
    expect(_.get(response, 'body.data.country', -1)).toEqual('Germany')
    expect(_.get(response, 'body.data.citizenship', -1)).toEqual('American')
    expect(_.get(response, 'body.data.street', -1)).toEqual('Berlin,Germany')
    expect(_.get(response, 'body.data.number', -1)).toEqual(245)
    expect(_.get(response, 'body.data.brithLocation', -1)).toEqual(
      'Berlin,Germany',
    )
    expect(_.get(response, 'body.data.brithDate', -1)).toEqual('2021-01-26')
    expect(_.get(response, 'body.data.brithName', -1)).toEqual('John Doe')
    expect(
      _.get(response, 'body.data.automaticProfitTransactionmoneyAmount', -1),
    ).toEqual(23.01)
  })
})
