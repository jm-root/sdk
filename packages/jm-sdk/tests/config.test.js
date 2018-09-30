const sdk = require('./sdk')
const logger = sdk.logger
let $ = sdk

beforeAll(async () => {
  await $.onReady()
  await $.checkLogin()
  $ = $.config
})

const root = 'test'
const key = 'test'
const value = 123

describe('config', () => {
  test('set and get and remove', async () => {
    let doc = await $.setConfig(root, key, value)
    expect(doc.ret).toBeTruthy()
    doc = await $.getConfig(root, key)
    expect(doc.ret === value).toBeTruthy()
    doc = await $.removeConfig(root, key)
    expect(doc.ret).toBeTruthy()
    doc = await $.getConfig(root, key)
    expect(!doc.ret).toBeTruthy()
  })

  test('getKeys and removeRoot', async () => {
    await $.setConfig(root, key, value)
    let doc = await $.getKeys(root)
    expect(doc.rows.length).toBeTruthy()
    doc = await $.removeRoot(root)
    expect(doc.ret).toBeTruthy()
    doc = await $.getConfig(root, key)
    expect(!doc.ret).toBeTruthy()
  })

  test('setConfigs and getConfigs', async () => {
    let doc = await $.setConfigs(root, {key1: 123, key2: 'test'})
    expect(doc.ret).toBeTruthy()
    doc = await $.getConfigs(root)
    expect(doc.key1 === 123 && doc.key2 === 'test').toBeTruthy()
  })

})
