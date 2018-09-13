const event = require('jm-event')

const reservedKeys = [
  '_events',
  '_state',
  'state'
]

function validKey (key) {
  return reservedKeys.indexOf(key) === -1
}

class Store extends event.EventEmitter {
  constructor (opts = {}) {
    super(opts)
    this._state = {}
  }

  listen (...keys) {
    keys.forEach(key => {
      if (!validKey(key)) throw new Error(`${key} can not be listened`)
      Reflect.defineProperty(this, key, {
        configurable: true,
        enumerable: true,
        get: () => {
          const value = this._state[key]
          this.emit('get', key, value)
          return value
        },
        set: value => {
          this._state[key] = value
          this.emit('set', key, value)
        }
      })
    })
    return this
  }

  get state () {
    let value = Object.assign({}, this._state, this)
    reservedKeys.forEach(key => {
      delete value[key]
    })
    this.emit('get', 'state', value)
    return value
  }

  set state (value) {
    this.emit('set', 'state', value)
    Object.keys(this).forEach(key => {
      if (!validKey(key)) return
      const d = Reflect.getOwnPropertyDescriptor(this, key)
      if (d && d.set && d.get) return
      delete this[key]
    })
    this._state = {}
    Object.keys(value).forEach(key => {
      this[key] = value[key]
    })
  }
}

module.exports = Store
