const name = 'passport'

module.exports = function (opts) {
  let app = this
  this.bind(name)
  let $ = app[name]

  $.login = async function (username, password) {
    let uri = '/login'
    let doc = await this.post(uri, {username, password})
    return doc
  }

  return {
    name,
    unuse: () => {
      delete app[name]
    }
  }
}
