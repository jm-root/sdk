const sdk = require('./sdk')

const $ = sdk.storage
beforeAll(async () => {
  $
    .on('getItem', (key, value) => {
      console.log('getItem', key, value)
    })
    .on('setItem', (key, value) => {
      console.log('setItem', key, value)
    })
    .on('removeItem', (key) => {
      console.log('removeItem', key)
    })
})

describe('storage', () => {
  test('setItem', async () => {
    $.setItem('test', 123)
  })
  test('getItem', async () => {
    let val = $.getItem('test')
    expect(val).toBeTruthy()
  })
  test('removeItem', async () => {
    $.removeItem('test')
  })
})
