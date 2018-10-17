'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var jmErr = _interopDefault(require('jm-err'));
var jmEvent = _interopDefault(require('jm-event'));
var jmMsCore = _interopDefault(require('jm-ms-core'));
var jmSdkCore = _interopDefault(require('jm-sdk-core'));

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

var _async = function () {
  try {
    if (isNaN.apply(null, {})) {
      return function (f) {
        return function () {
          try {
            return Promise.resolve(f.apply(this, arguments));
          } catch (e) {
            return Promise.reject(e);
          }
        };
      };
    }
  } catch (e) {}

  return function (f) {
    // Pre-ES5.1 JavaScript runtimes don't accept array-likes in Function.apply
    return function () {
      var args = [];

      for (var i = 0; i < arguments.length; i++) {
        args[i] = arguments[i];
      }

      try {
        return Promise.resolve(f.apply(this, args));
      } catch (e) {
        return Promise.reject(e);
      }
    };
  };
}();
var Err = jmErr.Err;
var name = 'config';

var config = function config(opts) {
  var app = this;
  this.bind(name);
  var $ = app[name];
  /**
   * 获取配置
   * @param root 根(必填)
   * @param key 配置项(必填)
   * @returns {Promise<*>}
   */

  $.getConfig = _async(function (root, key) {
    var _this = this;

    if (!root || !key) throw jmErr.err(Err.FA_PARAMS);
    return _this.get("/".concat(root, "/").concat(key));
  });
  /**
   * 设置配置信息
   * @param root 根(必填)
   * @param key 配置项(必填)
   * @param value 配置值(可选)
   * @param expire 过期时间(可选, 单位秒, 默认0代表永不过期)
   * @returns {Promise<void>}
   */

  $.setConfig = _async(function (root, key, value) {
    var _this2 = this;

    var expire = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    if (!root || !key) throw jmErr.err(Err.FA_PARAMS);
    return _this2.post("/".concat(root, "/").concat(key), {
      value: value,
      expire: expire
    });
  });
  /**
   * 删除配置信息
   * @param root 根(必填)
   * @param key 配置项(必填)
   * @returns {Promise<*>}
   */

  $.removeConfig = _async(function (root, key) {
    var _this3 = this;

    if (!root || !key) throw jmErr.err(Err.FA_PARAMS);
    return _this3.delete("/".concat(root, "/").concat(key));
  });
  /**
   * 删除根配置, 所有根下面的配置信息都被删除
   * @param root 根(必填)
   * @returns {Promise<*>}
   */

  $.removeRoot = _async(function (root) {
    var _this4 = this;

    if (!root) throw jmErr.err(Err.FA_PARAMS);
    return _this4.delete("/".concat(root));
  });
  /**
   * 列出配置项, 返回{rows:[]}
   * @param root 根(必填)
   * @returns {Promise<*>}
   */

  $.getKeys = _async(function (root) {
    var _this5 = this;

    if (!root) throw jmErr.err(Err.FA_PARAMS);
    return _this5.get("/".concat(root));
  });
  /**
   * 列出配置项及值
   * @param root 根(必填)
   * @returns {Promise<*>}
   */

  $.getConfigs = _async(function (root) {
    var _this6 = this;

    if (!root) throw jmErr.err(Err.FA_PARAMS);
    return _this6.get("/".concat(root, "?all=1"));
  });
  /**
   * 设置多个配置信息
   * @param root 根(必填)
   * @param opts
   * @returns {Promise<*>}
   */

  $.setConfigs = _async(function (root) {
    var _this7 = this;

    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (!root) throw jmErr.err(Err.FA_PARAMS);
    return _this7.post("/".concat(root), {
      value: opts
    });
  });
  return {
    name: name,
    unuse: function unuse() {
      delete app[name];
    }
  };
};

var _async$1 = function () {
  try {
    if (isNaN.apply(null, {})) {
      return function (f) {
        return function () {
          try {
            return Promise.resolve(f.apply(this, arguments));
          } catch (e) {
            return Promise.reject(e);
          }
        };
      };
    }
  } catch (e) {}

  return function (f) {
    // Pre-ES5.1 JavaScript runtimes don't accept array-likes in Function.apply
    return function () {
      var args = [];

      for (var i = 0; i < arguments.length; i++) {
        args[i] = arguments[i];
      }

      try {
        return Promise.resolve(f.apply(this, args));
      } catch (e) {
        return Promise.reject(e);
      }
    };
  };
}(),
    name$1 = 'sso';

var sso = function sso(opts) {
  var app = this;
  this.bind(name$1);
  var $ = app[name$1];
  $.verify = _async$1(function () {
    var _this = this;

    var uri = '/verify';
    return _this.get(uri);
  });
  $.touch = _async$1(function (opts) {
    var _this2 = this;

    var uri = '/touch';
    return _this2.post(uri);
  });
  $.signout = _async$1(function () {
    var _this3 = this;

    var uri = '/signout';
    return _this3.get(uri);
  });
  return {
    name: name$1,
    unuse: function unuse() {
      delete app[name$1];
    }
  };
};

var _async$2 = function () {
  try {
    if (isNaN.apply(null, {})) {
      return function (f) {
        return function () {
          try {
            return Promise.resolve(f.apply(this, arguments));
          } catch (e) {
            return Promise.reject(e);
          }
        };
      };
    }
  } catch (e) {}

  return function (f) {
    // Pre-ES5.1 JavaScript runtimes don't accept array-likes in Function.apply
    return function () {
      var args = [];

      for (var i = 0; i < arguments.length; i++) {
        args[i] = arguments[i];
      }

      try {
        return Promise.resolve(f.apply(this, args));
      } catch (e) {
        return Promise.reject(e);
      }
    };
  };
}(),
    name$2 = 'passport';

var passport = function passport(opts) {
  var app = this;
  this.bind(name$2);
  var $ = app[name$2];
  $.login = _async$2(function (username, password) {
    var _this = this;

    var uri = '/login';
    return _this.post(uri, {
      username: username,
      password: password
    });
  });
  return {
    name: name$2,
    unuse: function unuse() {
      delete app[name$2];
    }
  };
};

function _invoke(body, then) {
  var result = body();

  if (result && result.then) {
    return result.then(then);
  }

  return then(result);
}

function _invokeIgnored(body) {
  var result = body();

  if (result && result.then) {
    return result.then(_empty);
  }
}

function _empty() {}

function _await(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  value = Promise.resolve(value);
  return then ? value.then(then) : value;
}

function _continue(value, then) {
  return value && value.then ? value.then(then) : then(value);
}

function _catch(body, recover) {
  try {
    var result = body();
  } catch (e) {
    return recover(e);
  }

  if (result && result.then) {
    return result.then(void 0, recover);
  }

  return result;
}

function _call(body, then, direct) {
  if (direct) {
    return then ? then(body()) : body();
  }

  try {
    var result = Promise.resolve(body());
    return then ? result.then(then) : result;
  } catch (e) {
    return Promise.reject(e);
  }
}

var _async$3 = function () {
  try {
    if (isNaN.apply(null, {})) {
      return function (f) {
        return function () {
          try {
            return Promise.resolve(f.apply(this, arguments));
          } catch (e) {
            return Promise.reject(e);
          }
        };
      };
    }
  } catch (e) {}

  return function (f) {
    // Pre-ES5.1 JavaScript runtimes don't accept array-likes in Function.apply
    return function () {
      var args = [];

      for (var i = 0; i < arguments.length; i++) {
        args[i] = arguments[i];
      }

      try {
        return Promise.resolve(f.apply(this, args));
      } catch (e) {
        return Promise.reject(e);
      }
    };
  };
}(),
    name$3 = 'login';

var login = function login(opts) {
  var checkOrLogin = _async$3(function () {
    var store = app.store;
    var storage = app.storage;
    var doc = storage.getJson('sso');
    return _invoke(function () {
      if (doc) {
        store.sso = doc;
        return _continue(_catch(function () {
          return _await(app.sso.verify(), function (_app$sso$verify) {
            doc = _app$sso$verify;
          });
        }, function (e) {
          doc = e.data || {};
        }), function () {
          if (!doc || !doc.token) {
            delete store.sso.token; // 删除token

            doc = null;
          }
        });
      }
    }, function () {
      return _invoke(function () {
        if (!doc) {
          return _invokeIgnored(function () {
            if (app.login) {
              return _await(app.login(), function (_app$login) {
                doc = _app$login;

                if (doc && doc.token) {
                  storage.setJson('sso', doc);
                  store.sso = doc;
                }
              });
            }
          });
        }
      }, function () {
        return doc;
      });
    });
  });

  var app = this;
  var doLogin = null;
  app.checkLogin = _async$3(function () {
    if (doLogin) return doLogin;
    doLogin = new Promise(_async$3(function (resolve, reject) {
      return _continue(_catch(function () {
        return _call(checkOrLogin, function (doc) {
          resolve(doc);
        });
      }, function (e) {
        reject(e);
      }), function () {
        doLogin = false;
      });
    }));
    return doLogin;
  });
  /**
   * 判断是否已经登陆
   */

  app.isLoggedIn = function () {
    return this.store.sso;
  };
  /**
   * 登出
   */


  app.logout = function () {
    delete this.store.sso;
    this.storage.removeItem('sso');
  };

  return {
    name: name$3,
    unuse: function unuse() {
      delete app.checkLgoin;
      delete app.isLoggedIn;
      delete app.logout;
    }
  };
};

function _invoke$1(body, then) {
  var result = body();

  if (result && result.then) {
    return result.then(then);
  }

  return then(result);
}

function _catch$1(body, recover) {
  try {
    var result = body();
  } catch (e) {
    return recover(e);
  }

  if (result && result.then) {
    return result.then(void 0, recover);
  }

  return result;
}

function _await$1(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  value = Promise.resolve(value);
  return then ? value.then(then) : value;
}

var _async$4 = function () {
  try {
    if (isNaN.apply(null, {})) {
      return function (f) {
        return function () {
          try {
            return Promise.resolve(f.apply(this, arguments));
          } catch (e) {
            return Promise.reject(e);
          }
        };
      };
    }
  } catch (e) {}

  return function (f) {
    // Pre-ES5.1 JavaScript runtimes don't accept array-likes in Function.apply
    return function () {
      var args = [];

      for (var i = 0; i < arguments.length; i++) {
        args[i] = arguments[i];
      }

      try {
        return Promise.resolve(f.apply(this, args));
      } catch (e) {
        return Promise.reject(e);
      }
    };
  };
}();
var utils = jmMsCore.utils;
var sso$1 = sso;
var types = ['get', 'post', 'put', 'delete', 'patch'];

var Sdk =
/*#__PURE__*/
function (_Core) {
  _inherits(Sdk, _Core);

  function Sdk() {
    var _this;

    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Sdk);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Sdk).call(this, opts));
    _this.ready = false;
    _this.store.config = opts;
    types.forEach(function (type) {
      _this.bindType(_assertThisInitialized(_assertThisInitialized(_this)), type);
    });
    var mdls = {
      config: config,
      sso: sso$1,
      passport: passport,
      login: login
    };
    var modules = Object.assign({}, opts.modules);
    Object.keys(mdls).forEach(function (key) {
      if (!modules[key]) return;
      var cfg = Object.assign({}, opts, modules[key]);

      _this.use(mdls[key], cfg);
    });

    _this.onReady();

    return _this;
  }

  _createClass(Sdk, [{
    key: "onReady",
    value: _async$4(function () {
      var _this2 = this;

      if (_this2.ready) return _this2.ready;
      if (_this2.initing) return _this2.initing;
      _this2.initing = new Promise(_async$4(function (resolve, reject) {
        _this2.once('ready', function (doc) {
          _this2.ready = true;
          resolve(_this2.ready);
        });

        delete _this2.initing;
      }));
      return _this2.initing;
    })
  }, {
    key: "request",
    value: _async$4(function () {
      var _this3 = this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var _this3$ready = _this3.ready;
      return _await$1(_this3$ready || _this3.onReady(), function (_this3$onReady) {
        if (!_this3.router) throw new Error('invalid router');
        var opts = utils.preRequest.apply(utils, args);
        var sso$$1 = _this3.store.sso || {};

        if (sso$$1.token) {
          opts.headers || (opts.headers = {});
          opts.headers.Authorization = sso$$1.token;
        }

        var logger = _this3.logger;
        var strRequest = "request:\n".concat(JSON.stringify(opts, null, 2));
        return _catch$1(function () {
          return _await$1(_this3.router.request(opts), function (doc) {
            logger.debug("".concat(strRequest, "\nresult:\n").concat(JSON.stringify(doc, null, 2)));
            return doc;
          });
        }, function (e) {
          var _exit = false;
          return _invoke$1(function () {
            if (e.data && e.data.err === 401 && _this3.checkLogin) {
              logger.debug('not login, so checkLogin and try again');
              return _await$1(_this3.checkLogin(), function (_this3$checkLogin) {
                sso$$1 = _this3$checkLogin;
                return function () {
                  if (sso$$1.token) {
                    opts.headers || (opts.headers = {});
                    opts.headers.Authorization = sso$$1.token;
                    return _catch$1(function () {
                      return _await$1(_this3.router.request(opts), function (doc) {
                        logger.debug("".concat(strRequest, "\nresult:\n").concat(JSON.stringify(doc, null, 2)));
                        _exit = true;
                        return doc;
                      });
                    }, function (e) {
                      return _catch$1(function () {
                        return _await$1(_this3.emit('error', e, opts), function (ret) {
                          if (ret !== undefined) {
                            logger.debug("".concat(strRequest, "\nresult:\n").concat(JSON.stringify(ret, null, 2)));
                            _exit = true;
                            return ret;
                          }

                          throw e;
                        });
                      }, function (ee) {
                        logger.debug("".concat(strRequest, "\nerr:\n").concat(JSON.stringify(ee.data || null, null, 2)));
                        logger.error(ee);
                        throw ee;
                      });
                    });
                  }
                }();
              });
            }
          }, function (_result) {
            return _exit ? _result : _catch$1(function () {
              return _await$1(_this3.emit('error', e, opts), function (ret) {
                if (ret !== undefined) {
                  logger.debug("".concat(strRequest, "\nresult:\n").concat(JSON.stringify(ret, null, 2)));
                  return ret;
                }

                throw e;
              });
            }, function (ee) {
              logger.debug("".concat(strRequest, "\nerr:\n").concat(JSON.stringify(ee.data || null, null, 2)));
              logger.error(ee);
              throw ee;
            });
          });
        });
      }, _this3$ready);
    })
  }, {
    key: "bindType",
    value: function bindType($, type) {
      var _this4 = this;

      var uri = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      $[type] = _async$4(function () {
        var opts = utils.preRequest.apply(utils, arguments);
        opts.uri = "".concat(uri).concat(opts.uri);
        opts.type = type;
        return _this4.request(opts);
      });
    }
  }, {
    key: "bind",
    value: function bind(name, uri) {
      var _this5 = this;

      uri || (uri = '/' + name);
      var $ = {};
      jmEvent.enableEvent($, {
        async: true
      });
      types.forEach(function (type) {
        _this5.bindType($, type, uri);
      });
      this[name] = $;
      return this;
    }
  }, {
    key: "router",
    get: function get() {
      return this._router;
    },
    set: function set(value) {
      if (!value) throw new Error('invalid router');
      this._router = value;
      this.ready = true;
      this.emit('ready');
    }
  }]);

  return Sdk;
}(jmSdkCore);

var lib = Sdk;

exports.default = lib;
//# sourceMappingURL=index.js.map
