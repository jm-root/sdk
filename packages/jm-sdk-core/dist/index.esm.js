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

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function validKey(key) {
  return ['state', 'on', 'once', 'off', 'emit', '_events', 'eventNames', 'listeners'].indexOf(key) === -1;
}

var handler = {
  get: function get(target, key, receiver) {
    if (validKey(key)) {
      var value = target.state[key];
      target.emit('get', key, value);
      return value;
    }

    return Reflect.get(target, key, receiver);
  },
  set: function set(target, key, value, receiver) {
    if (validKey(key)) {
      target.state = Object.assign(target.state, _defineProperty({}, key, value));
      target.emit('set', key, value);
      return true;
    }

    return Reflect.set(target, key, value, receiver);
  },
  deleteProperty: function deleteProperty(target, key) {
    if (validKey(key)) {
      delete target.state[key];
      target.emit('remove', key);
      return true;
    }

    return Reflect.deleteProperty(target, key);
  }
};

var Store = function Store() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, Store);

  jmEvent.enableEvent(this);
  this.state = opts.state || {};
  var doc = new Proxy(this, handler);
  return doc;
};

var store = Store;

var Store$1 =
/*#__PURE__*/
function () {
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

var Storage =
/*#__PURE__*/
function () {
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
