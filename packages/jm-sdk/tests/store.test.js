const sdk = require('./sdk')

const $ = sdk.store
$.on('setItem', (k, v) => {
  console.log(`event setItem(${k},${v})`)
})
$.on('getItem', (k, v) => {
  console.log(`event getItem(${k},${v})`)
})
describe('store', () => {
  test('setItem', async () => {
    $.setItem('test', 123)
  })
  test('getItem', async () => {
    let val = $.getItem('test')
    expect(val).toBeTruthy()
  })
})
