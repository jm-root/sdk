const sdk = require('./sdk')
let $ = sdk.store

beforeAll(async () => {
  $
    .on('get', (key, value) => {
      console.log('event get', key, value)
    })
    .on('set', (key, value) => {
      console.log('event set', key, value)
    })
  $.listen('name', 'nick')
  $.state = {
    nick: 'nick'
  }
  $.name = 'jeff'
})

describe('store', () => {
  test('get', async () => {
    console.log('state', $.state)
    console.log('store', $)
    expect($.name).toBeTruthy()
  })
  test('set', async () => {
    $.name = 'jeff2'
    console.log('state', $.state)
    console.log('store', $)
    expect($.name).toBeTruthy()
  })
  test('remove', async () => {
    delete $.name
    console.log('state', $.state)
    console.log('store', $)
    expect(!$.name).toBeTruthy()
  })
})
