const event = require('jm-event')
const mdl = require('jm-module')
const log = require('jm-logger')
const Store = require('./store')
const storage = require('./storage')

class Sdk {
  constructor (opts = {}) {
    mdl.enableModule(this)
    event.enableEvent(this)
    this.logger = opts.logger || log.getLogger('sdk')
    this.getLogger = opts.getLogger || log.getLogger
    this.store = opts.store || new Store()
    this.storage = opts.storage || storage
  }
}

module.exports = Sdk
