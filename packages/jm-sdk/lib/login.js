const name = 'login'

module.exports = function (opts) {
  let app = this
  let doLogin = null

  async function checkOrLogin () {
    let store = app.store
    let storage = app.storage
    let doc = storage.getJson('sso')
    if (doc) {
      store.sso = doc
      try {
        doc = await app.sso.verify()
      } catch (e) {
        doc = e.data || {}
      }
      if (!doc.token) {
        doc = null
        storage.removeItem('sso')
        delete store.sso
      }
    }
    if (!doc) {
      if (!app.login) throw new Error('login 接口未实现')
      doc = await app.login()
      if (doc && doc.token) {
        storage.setJson('sso', doc)
        store.sso = doc
      }
    }
    return doc
  }

  app.checkLogin = async function () {
    if (doLogin) return doLogin
    doLogin = new Promise(
      async (resolve, reject) => {
        try {
          let doc = await checkOrLogin()
          resolve(doc)
        } catch (e) {
          reject(e)
        }
        doLogin = false
      }
    )
    return doLogin
  }

  /**
   * 判断是否已经登陆
   */
  app.isLoggedIn = function () {
    return this.store.sso
  }

  /**
   * 登出
   */
  app.logout = function () {
    delete this.store.sso
    this.storage.removeItem('sso')
  }

  return {
    name,
    unuse: () => {
      delete app.checkLgoin
      delete app.isLoggedIn
      delete app.logout
    }
  }
}
