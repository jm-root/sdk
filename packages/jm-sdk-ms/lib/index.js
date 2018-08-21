const MS = require('jm-ms/lib/browser')

module.exports = function (opts) {
  let app = this
  app.ms = new MS(opts)

  return {
    name: 'ms',
    unuse: () => {
      delete app.ms
    }
  }
}
