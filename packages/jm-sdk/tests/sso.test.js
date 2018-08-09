const sdk = require('./sdk')
const logger = sdk.logger
let $ = sdk

beforeAll(async () => {
  await $.onReady()
  await $.checkLogin()
  $ = $.sso
})

describe('sso', () => {
  test('verify', async () => {
    let doc = await $.verify()
    expect(doc).toBeTruthy()
  })

  test('touch', async () => {
    let doc = await $.touch({time: Date.now()})
    expect(doc).toBeTruthy()
  })
})
