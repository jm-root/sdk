const event = require('jm-event')

class Store {
  constructor () {
    event.enableEvent(this)
    this.stores = []
  }

  setItem (k, v) {
    this.emit('setItem', k, v)
    this.stores[k] = v
  }

  getItem (k, defaultV) {
    let v = this.stores[k] || defaultV
    this.emit('getItem', k, v)
    return v
  }

  removeItem (k) {
    this.emit('removeItem', k)
    delete this.stores[k]
  }

  setJson (k, o) {
    this.emit('setJson', k, o)
    this.setItem(k, JSON.stringify(o))
  }

  getJson (k, defaultV) {
    let v = this.getItem(k)
    if (!v) return defaultV
    let o = JSON.parse(v) || defaultV
    this.emit('getJson', k, o)
    return o
  }
}

module.exports = Store
