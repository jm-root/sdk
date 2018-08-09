const sdk = require('./sdk')

const $ = sdk.storage

describe('storage', () => {
  test('setItem', async () => {
    $.setItem('test', 123)
  })
  test('getItem', async () => {
    let val = $.getItem('test')
    expect(val).toBeTruthy()
  })
})
