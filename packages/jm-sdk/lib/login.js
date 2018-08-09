module.exports = function (opts) {
  let app = this
  let doLogin = null

  async function checkOrLogin () {
    let doc = app.storage.getJson('sso')
    if (doc) {
      app.store.setJson('sso', doc)
      doc = await app.sso.verify()
      if (!doc.token) {
        doc = null
        app.storage.removeItem('sso')
        app.store.removeItem('sso')
      }
    }
    if (!doc) {
      if (!app.login) throw new Error('login 接口未实现')
      doc = await app.login()
      if (doc && doc.token) {
        app.store.setJson('sso', doc)
      } else {
        doc = null
        throw new Error('未登陆')
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
    return this.store.getJson('sso')
  }

  /**
   * 登出
   */
  app.logout = function () {
    this.store.removeItem('sso')
    this.storage.removeItem('sso')
  }

  return {
    name: 'login',
    unuse: () => {
      delete app.checkLgoin
      delete app.isLoggedIn
      delete app.logout
    }
  }
}
