const event = require('jm-event')
const Core = require('jm-sdk-core')
const ms = require('jm-sdk-ms')
const sso = require('./sso')
const passport = require('./passport')
const login = require('./login')

const types = ['get', 'post', 'put', 'delete']

class Sdk extends Core {
  constructor (opts = {}) {
    super(opts)
    this.ready = false
    this.store.config = opts

    const mdls = {
      ms,
      sso,
      passport,
      login
    }
    let modules = Object.assign({ms: {}}, opts.modules)
    Object.keys(mdls).forEach(
      key => {
        if (!modules[key]) return
        let cfg = Object.assign({}, opts, modules[key])
        this.use(mdls[key], cfg)
      }
    )
    this.onReady()
  }

  async onReady () {
    if (this.ready) return this.ready
    if (this.initing) return this.initing

    this.initing = new Promise(
      async (resolve, reject) => {
        try {
          let client = await this.ms.client({uri: this.store.config.api})
          this.request = async function (...args) {
            let opts = this.ms.utils.preRequest(...args)
            let sso = this.store.sso || {}
            if (sso.token) {
              opts.headers || (opts.headers = {})
              opts.headers.Authorization = sso.token
            }
            try {
              let doc = await client.request(opts)
              let s = `request:\n${JSON.stringify(opts, null, 2)}\nresult:\n${JSON.stringify(doc.data || doc, null, 2)}`
              this.logger.debug(s)
              return doc
            } catch (e) {
              if (e.data && e.data.err === 401 && this.checkLogin) {
                this.logger.debug('not login, so checkLogin and try again')
                sso = await this.checkLogin()
                if (sso.token) {
                  opts.headers || (opts.headers = {})
                  opts.headers.Authorization = sso.token
                  let doc = await client.request(opts)
                  let s = `request:\n${JSON.stringify(opts, null, 2)}\nresult:\n${JSON.stringify(doc.data || doc, null, 2)}`
                  this.logger.debug(s)
                  return doc
                }
              }
              throw e
            }
          }
          types.forEach(type => {
            this.bindType(this, type)
          })
          this.ready = true
          resolve(this.ready)
        } catch (e) {
          this.ready = false
          reject(e)
        }
        delete this.initing
      }
    )
    return this.initing
  }

  bindType ($, type, uri = '') {
    $[type] = async (...args) => {
      let opts = this.ms.utils.preRequest(...args)
      opts.uri = `${uri}${opts.uri}`
      opts.type = type
      let doc = await this.request(opts)
      return doc
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
