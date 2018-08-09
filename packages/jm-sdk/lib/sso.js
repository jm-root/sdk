module.exports = function (opts) {
  let app = this
  this.bind('sso')
  let $ = app.sso

  $.verify = async function () {
    let uri = '/verify'
    let doc = await this.get(uri)
    return doc
  }

  $.touch = async function (opts) {
    let uri = '/touch'
    let doc = await this.post(uri)
    return doc
  }

  $.signout = async function () {
    let uri = '/signout'
    let doc = await this.get(uri)
    return doc
  }

  return {
    name: 'sso',
    unuse: () => {
      delete app.sso
    }
  }
}
