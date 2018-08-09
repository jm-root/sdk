const sdk = require('./sdk')
const $ = sdk
const logger = $.logger

beforeAll(async () => {
  await $.onReady()
  await $.checkLogin()
})

describe('ms', async () => {
  test('get', async () => {
    let doc = await $.get('/')
    expect(doc).toBeTruthy()
  })
})
