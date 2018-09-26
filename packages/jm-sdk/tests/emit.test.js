const sdk = require('./sdk')
let $ = sdk

beforeAll(async () => {
  await $.onReady()
  $ = $.sso
  sdk.on('error', (e, opts) => {
    console.log(e, opts)
    return null
  })
})

describe('emit', () => {
  test('emit err', async () => {
    let doc = await $.verify()
    expect(doc === null).toBeTruthy()
  })
})
