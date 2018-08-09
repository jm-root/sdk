module.exports = function (opts) {
  let app = this
  this.bind('passport')
  let $ = app.passport

  $.login = async function (username, password) {
    let uri = '/login'
    let doc = await this.post(uri, {username, password})
    return doc
  }

  return {
    name: 'passport',
    unuse: () => {
      delete app.passport
    }
  }
}
