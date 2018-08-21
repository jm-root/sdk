const event = require('jm-event')

function validKey (key) {
  return [
    'state',
    'on',
    'once',
    'off',
    'emit',
    '_events',
    'eventNames',
    'listeners'
  ].indexOf(key) === -1
}

const handler = {
  get: function (target, key, receiver) {
    if (validKey(key)) {
      let value = target.state[key]
      target.emit('get', key, value)
      return value
    }
    return Reflect.get(target, key, receiver)
  },
  set: function (target, key, value, receiver) {
    if (validKey(key)) {
      target.state = Object.assign({[key]: value})
      target.emit('set', key, value)
      return true
    }
    return Reflect.get(target, key, value, receiver)
  },
  deleteProperty: function (target, key) {
    if (validKey(key)) {
      delete target.state[key]
      target.emit('remove', key)
      return true
    }
    return Reflect.deleteProperty(target, key)
  }
}

class Store {
  constructor (opts = {}) {
    event.enableEvent(this)
    this.state = opts.state || {}
    let doc = new Proxy(this, handler)
    return doc
  }
}

module.exports = Store
