import jmEvent from 'jm-event';
import jmModule from 'jm-module';
import jmLogger from 'jm-logger';

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

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
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

function _createSuper(Derived) {
  return function () {
    var Super = _getPrototypeOf(Derived),
        result;

    if (_isNativeReflectConstruct()) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

var reservedKeys = ['_events', '_state', 'state'];

function validKey(key) {
  return reservedKeys.indexOf(key) === -1;
}

var Store = /*#__PURE__*/function (_event$EventEmitter) {
  _inherits(Store, _event$EventEmitter);

  var _super = _createSuper(Store);

  function Store() {
    var _this;

    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Store);

    _this = _super.call(this, opts);
    _this._state = {};
    return _this;
  }

  _createClass(Store, [{
    key: "listen",
    value: function listen() {
      var _this2 = this;

      for (var _len = arguments.length, keys = new Array(_len), _key = 0; _key < _len; _key++) {
        keys[_key] = arguments[_key];
      }

      keys.forEach(function (key) {
        if (!validKey(key)) throw new Error("".concat(key, " can not be listened"));
        Reflect.defineProperty(_this2, key, {
          configurable: true,
          enumerable: true,
          get: function get() {
            var value = _this2._state[key];

            _this2.emit('get', key, value);

            return value;
          },
          set: function set(value) {
            _this2._state[key] = value;

            _this2.emit('set', key, value);
          }
        });
      });
      return this;
    }
  }, {
    key: "state",
    get: function get() {
      var value = Object.assign({}, this._state, this);
      reservedKeys.forEach(function (key) {
        delete value[key];
      });
      this.emit('get', 'state', value);
      return value;
    },
    set: function set(value) {
      var _this3 = this;

      this.emit('set', 'state', value);
      Object.keys(this).forEach(function (key) {
        if (!validKey(key)) return;
        var d = Reflect.getOwnPropertyDescriptor(_this3, key);
        if (d && d.set && d.get) return;
        delete _this3[key];
      });
      this._state = {};
      Object.keys(value).forEach(function (key) {
        _this3[key] = value[key];
      });
    }
  }]);

  return Store;
}(jmEvent.EventEmitter);

var store = Store;

var Store$1 = /*#__PURE__*/function () {
  function Store() {
    _classCallCheck(this, Store);

    jmEvent.enableEvent(this);
    this.store = {};
  }

  _createClass(Store, [{
    key: "setItem",
    value: function setItem(k, v) {
      this.emit('setItem', k, v);
      this.store[k] = v;
    }
  }, {
    key: "getItem",
    value: function getItem(k, defaultV) {
      var v = this.store[k] || defaultV;
      this.emit('getItem', k, v);
      return v;
    }
  }, {
    key: "removeItem",
    value: function removeItem(k) {
      this.emit('removeItem', k);
      delete this.store[k];
    }
  }, {
    key: "setJson",
    value: function setJson(k, o) {
      this.emit('setJson', k, o);
      this.setItem(k, JSON.stringify(o));
    }
  }, {
    key: "getJson",
    value: function getJson(k, defaultV) {
      var v = this.getItem(k);
      if (!v) return defaultV;
      var o = JSON.parse(v) || defaultV;
      this.emit('getJson', k, o);
      return o;
    }
  }]);

  return Store;
}();

var Storage = /*#__PURE__*/function () {
  function Storage() {
    _classCallCheck(this, Storage);

    jmEvent.enableEvent(this);
  }

  _createClass(Storage, [{
    key: "setItem",
    value: function setItem(k, v) {
      this.emit('setItem', k, v);
      localStorage.setItem(k, v);
    }
  }, {
    key: "getItem",
    value: function getItem(k, defaultV) {
      var v = localStorage.getItem(k) || defaultV;
      this.emit('getItem', k, v);
      return v;
    }
  }, {
    key: "removeItem",
    value: function removeItem(k) {
      this.emit('removeItem', k);
      localStorage.removeItem(k);
    }
  }, {
    key: "setJson",
    value: function setJson(k, o) {
      this.emit('setJson', k, o);
      this.setItem(k, JSON.stringify(o));
    }
  }, {
    key: "getJson",
    value: function getJson(k, defaultV) {
      var v = this.getItem(k);
      if (!v) return defaultV;
      var o = JSON.parse(v) || defaultV;
      this.emit('getJson', k, o);
      return o;
    }
  }]);

  return Storage;
}();

var storage = null;

if (typeof localStorage !== 'undefined') {
  storage = new Storage();
} else {
  storage = new Store$1();
}

var storage_1 = storage;

var Sdk = function Sdk() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, Sdk);

  jmModule.enableModule(this);
  jmEvent.enableEvent(this, {
    async: true
  });
  this.logger = opts.logger || jmLogger.getLogger('sdk');
  this.getLogger = opts.getLogger || jmLogger.getLogger;
  this.store = opts.store || new store();
  this.storage = opts.storage || storage_1;
};

var lib = Sdk;

export default lib;
//# sourceMappingURL=index.esm.js.map
