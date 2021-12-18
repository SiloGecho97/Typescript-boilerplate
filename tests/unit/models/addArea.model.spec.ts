// const faker = require('faker');
import { AddRetailer } from '../../../src/models'

interface AddRetailerTwo {
  eventName: string
  eventTime: Date | string
  areaId: string
  name: string
}

describe('Add Area Event model', () => {
  describe('Event validation', () => {
    let newEvent: AddRetailerTwo
    beforeEach(() => {
      newEvent = {
        eventName: 'CustomerRegister',
        eventTime: new Date(),
        areaId: 'cbc5c00a-486d-11ec-81d3-0242ac130003"',
        name: 'xotto-area-1',
      }
    })

    test('should correctly validate a valid Event', async () => {
      await expect(
        new AddRetailer(newEvent).validate(),
      ).resolves.toBeUndefined()
    })

    test('should throw a validation error if eventName is invalid', async () => {
      newEvent.eventName = ''
      await expect(new AddRetailer(newEvent).validate()).rejects.toThrow()
    })

    test('should throw a validation error if eventTime is invalid', async () => {
      newEvent.eventTime = 'notAdate'
      await expect(new AddRetailer(newEvent).validate()).rejects.toThrow()
    })
  })
})
