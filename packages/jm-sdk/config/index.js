require('log4js').configure(require('path').join(__dirname, 'log4js.json'))
let config = {
  localhost: {
    api: 'http://localhost:3000'
  },
  development: {
    api: 'http://api.test.jamma.cn'
  },
  production: {
    api: 'http://api.jamma.cn'
  }
}

const defaultConfig = {
  modules: {
    ms: {},
    sso: {},
    passport: {},
    login: {}
  }
}

let env = process.env.NODE_ENV || 'development'
config = config[env] || config['development']
config.env = env
config = Object.assign({}, defaultConfig, config)

module.exports = config
