const MS = require('jm-ms/lib/browser')

module.exports = function (opts) {
  let app = this
  app.ms = new MS(opts)
  app.router = app.ms.router()

  if (!this.store.config.api) return app.emit('ready')
  app.ms.client({uri: this.store.config.api})
    .then(doc => {
      app.router.use(doc)
      app.emit('ready')
    })

  return {
    name: 'ms',
    unuse: () => {
      delete app.ms
    }
  }
}
