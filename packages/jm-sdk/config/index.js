let config = {
  localhost: {
    logLevel: 'debug',
    api: 'http://localhost:3000'
  },
  development: {
    logLevel: 'debug',
    api: 'http://api.test.jamma.cn'
  },
  production: {
    api: 'http://api.jamma.cn'
  }
}

const defaultConfig = {
  modules: {
    config: {},
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
