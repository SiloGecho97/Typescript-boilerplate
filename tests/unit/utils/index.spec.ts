import constructSortKey from '../../../src/utils/generateSortKey'

describe('Test Suite sort key generation', () => {
  it('generate sort key', () => {
    const generateKey = constructSortKey()
    expect(generateKey).not.toBeNull()
    expect(generateKey).toBeDefined()
    expect(generateKey).toMatchObject({
      directoryName: `${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}_0`,
    })
  })
})
