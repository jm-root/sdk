const Sdk = require('../lib')
const config = require('../config')

console.log('config %j', config)

let sdk = new Sdk(config)
// sdk.logger.level = 'info'
sdk.login = async function () {
  let doc = await this.passport.login('root', '123')
  return doc
}

module.exports = sdk
