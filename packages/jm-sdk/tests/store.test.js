const sdk = require('./sdk')
let $ = sdk.store

beforeAll(async () => {
  $.name = 'jeff'
  $
    .on('get', (key, value) => {
      console.log('get', key, value)
    })
    .on('set', (key, value) => {
      console.log('set', key, value)
    })
    .on('remove', (key) => {
      console.log('remove', key)
    })
})

describe('store', () => {
  test('get', async () => {
    console.log('state', $.state)
    expect($.name).toBeTruthy()
  })
  test('set', async () => {
    $.name = 'jeff2'
    console.log('state', $.state)
    expect($.name).toBeTruthy()
  })
  test('remove', async () => {
    delete $.name
    console.log('state', $.state)
    expect(!$.name).toBeTruthy()
  })
})
