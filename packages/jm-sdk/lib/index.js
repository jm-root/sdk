const event = require('jm-event')
const utils = require('jm-ms-core').utils
const Core = require('jm-sdk-core')
const config = require('./config')
const sso = require('./sso')
const passport = require('./passport')
const login = require('./login')

const types = ['get', 'post', 'put', 'delete', 'patch']

class Sdk extends Core {
  constructor (opts = {}) {
    super(opts)
    this.ready = false
    this.store.config = opts

    types.forEach(type => {
      this.bindType(this, type)
    })

    const mdls = {
      config,
      sso,
      passport,
      login
    }
    let modules = Object.assign({}, opts.modules)
    Object.keys(mdls).forEach(
      key => {
        if (!modules[key]) return
        let cfg = Object.assign({}, opts, modules[key])
        this.use(mdls[key], cfg)
      }
    )

    this.onReady()
  }

  get router () { return this._router }

  set router (value) {
    if (!value) throw new Error('invalid router')
    this._router = value
    this.ready = true
    this.emit('ready')
  }

  async onReady () {
    if (this.ready) return this.ready
    if (this.initing) return this.initing

    this.initing = new Promise(
      async (resolve, reject) => {
        this.once('ready', doc => {
          this.ready = true
          resolve(this.ready)
        })
        delete this.initing
      }
    )
    return this.initing
  }

  async request (...args) {
    this.ready || await this.onReady()
    if (!this.router) throw new Error('invalid router')
    let opts = utils.preRequest(...args)
    let sso = this.store.sso || {}
    if (sso.token) {
      opts.headers || (opts.headers = {})
      opts.headers.Authorization = sso.token
    }
    const {logger} = this
    const strRequest = `request:\n${JSON.stringify(opts, null, 2)}`
    try {
      let doc = await this.router.request(opts)
      logger.debug(`${strRequest}\nresult:\n${JSON.stringify(doc, null, 2)}`)
      return doc
    } catch (e) {
      if (e.data && e.data.err === 401 && this.checkLogin) {
        logger.debug('not login, so checkLogin and try again')
        await this.logout() // clear old sso
        sso = await this.checkLogin()
        if (sso.token) {
          opts.headers || (opts.headers = {})
          opts.headers.Authorization = sso.token
          try {
            let doc = await this.router.request(opts)
            logger.debug(`${strRequest}\nresult:\n${JSON.stringify(doc, null, 2)}`)
            return doc
          } catch (e) {
            try {
              const ret = await this.emit('error', e, opts)
              if (ret !== undefined) {
                logger.debug(`${strRequest}\nresult:\n${JSON.stringify(ret, null, 2)}`)
                return ret
              }
              throw e
            } catch (ee) {
              logger.error(`${strRequest}\nresult:\n${JSON.stringify(ee.data || null, null, 2)}`)
              throw ee
            }
          }
        }
      }

      try {
        const ret = await this.emit('error', e, opts)
        if (ret !== undefined) {
          logger.debug(`${strRequest}\nresult:\n${JSON.stringify(ret, null, 2)}`)
          return ret
        }
        throw e
      } catch (ee) {
        logger.error(`${strRequest}\nresult:\n${JSON.stringify(ee.data || null, null, 2)}`)
        throw ee
      }
    }
  }

  bindType ($, type, uri = '') {
    $[type] = async (...args) => {
      let opts = utils.preRequest(...args)
      opts.uri = `${uri}${opts.uri}`
      opts.type = type
      return this.request(opts)
    }
  }

  bind (name, uri) {
    uri || (uri = '/' + name)
    let $ = {}
    event.enableEvent($, {async: true})
    types.forEach(type => {
      this.bindType($, type, uri)
    })
    this[name] = $
    return this
  }
}

module.exports = Sdk
