const event = require('jm-event')

class Store {
  constructor () {
    event.enableEvent(this)
    this.store = {}
  }

  setItem (k, v) {
    this.emit('setItem', k, v)
    this.store[k] = v
  }

  getItem (k, defaultV) {
    let v = this.store[k] || defaultV
    this.emit('getItem', k, v)
    return v
  }

  removeItem (k) {
    this.emit('removeItem', k)
    delete this.store[k]
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

class Storage {
  constructor () {
    event.enableEvent(this)
  }

  setItem (k, v) {
    this.emit('setItem', k, v)
    localStorage.setItem(k, v)
  }

  getItem (k, defaultV) {
    let v = localStorage.getItem(k) || defaultV
    this.emit('getItem', k, v)
    return v
  }

  removeItem (k) {
    this.emit('removeItem', k)
    localStorage.removeItem(k)
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

let storage = null
if (typeof localStorage !== 'undefined') {
  storage = new Storage()
} else {
  storage = new Store()
}

module.exports = storage
