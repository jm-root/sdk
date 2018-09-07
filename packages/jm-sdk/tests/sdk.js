const MS = require('jm-ms')
const Sdk = require('../lib')
const config = require('../config')
const ms = new MS()

console.log('config %j', config)

let sdk = new Sdk(config)
ms.client({uri: config.api})
  .then(doc => {
    sdk.router = doc
  })

sdk.logger.level = config.logLevel || 'info'
sdk.login = async function () {
  let doc = await this.passport.login('root', '123')
  return doc
}

module.exports = sdk
