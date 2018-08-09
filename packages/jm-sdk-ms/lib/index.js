const MS = require('jm-ms/lib/browser')
const ms = new MS()

module.exports = function (opts) {
  let app = this
  app.ms = ms

  return {
    name: 'ms',
    unuse: () => {
      delete app.ms
    }
  }
}
