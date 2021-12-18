import AddRetailerModel from '../../src/models/AddRetailer'
import { AddRetailer } from '../../src/types/models/events'
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

describe('area test', () => {
  it('can be created correctly', async () => {
    expect.assertions(4)
    const AddRetailer: AddRetailer = new AddRetailerModel()

    const testDate = new Date()

    AddRetailer.eventName = 'Create Test Event'
    AddRetailer.eventTime = testDate
    AddRetailer.areaId = '123'
    AddRetailer.name = 'Test Name'

    await AddRetailer.save()

    const areaInDb = await AddRetailerModel.findOne({
      eventName: 'Create Test Event',
    }).exec()

    expect(areaInDb?.eventName).toEqual('Create Test Event')
    expect(areaInDb?.eventTime).toEqual(testDate)
    expect(areaInDb?.areaId).toEqual('123')
    expect(areaInDb?.name).toEqual('Test Name')
  })
})
