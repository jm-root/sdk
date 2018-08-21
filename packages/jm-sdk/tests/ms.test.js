const sdk = require('./sdk')
const $ = sdk

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
