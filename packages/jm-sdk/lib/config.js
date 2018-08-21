const name = 'config';

module.exports = function (opts) {
  let app = this
  this.bind(name)

  return {
    name,
    unuse: () => {
      delete app[name]
    }
  }
}
