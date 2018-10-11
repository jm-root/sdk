const name = 'sso'

module.exports = function (opts) {
  let app = this
  this.bind(name)
  let $ = app[name]

  $.verify = async function () {
    const uri = '/verify'
    return this.get(uri)
  }

  $.touch = async function (opts) {
    const uri = '/touch'
    return this.post(uri)
  }

  $.signout = async function () {
    const uri = '/signout'
    return this.get(uri)
  }

  return {
    name,
    unuse: () => {
      delete app[name]
    }
  }
}
