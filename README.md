---
theme : "white"
---

# sdk

---

## 用法

```js
import SDK from 'jm-sdk'

let sdk = new SDK({
  api: 'http://api.test.jamma.cn',
  modules: {
    sso: {},
    passport: {},
    login: {}
  }
})

```

---

## 模块化

```
let mdl = function (opts) {
  let app = this
  this.bind('test')
  let $ = app.test

  return {
    name: 'test',
    unuse: () => {
      delete app.test
    }
  }
}

sdk.use(mdl, {})

```

---

## store

- 用于全局变量存储

- 非持久存储，刷新页面时，所有数据清空

```js
let store = sdk.store

store.state = {name: 'jeff'}
store.state // {name: 'jeff'}

store.sso = {token: 'test'}
store.state // {name: 'jeff', sso: {token: 'test'}}

// 支持事件
store
    .on('get', (key, value) => {
      console.log('get', key, value)
    })
    .on('set', (key, value) => {
      console.log('set', key, value)
    })

```

--

## store 事件

- 支持 set, get, remove 3 种事件

```js
let store = sdk.store

// 支持事件
store
    .on('get', (key, value) => {
      console.log('get', key, value)
    })
    .on('set', (key, value) => {
      console.log('set', key, value)
    })
    .on('remove', (key) => {
      console.log('remove', key)
    })

```

---

## storage

```js
let storage = sdk.storage // 浏览器持久化存储 localStorage

// 例子
storage.setJson('sso', {token: '12345676'})
storage.getJson('sso') // 返回json对象
storage.setItem('nick', 'jeff')
storage.getItem('nick') //返回 nick
storage.removeItem('nick') // 删除
```

--

### storage 事件

- 支持 setItem, getItem, setJson, getJson, removeItem 5 种事件

```js
let storage = sdk.storage // 浏览器持久化存储 localStorage

storage
    .on('getItem', (key, value) => {
      console.log('getItem', key, value)
    })
    .on('setItem', (key, value) => {
      console.log('setItem', key, value)
    })
    .on('removeItem', (key) => {
      console.log('removeItem', key)
    })
```

---

## request 请求

- 所有请求返回Promise对象
- 如果store.sso存在, 所有ajax请求会在headers中附加Authorization, 用于自动验证。
- 例如：sso 值为 {token: '123'}, 则ajax请求的 headers:{ Authorization: '123', ...}

--

### request 例子

```js

// 实际请求地址为 ${config.api}/sso/verify?token=123
sdk.request({
    uri: '/sso/verify?token=123',
    type: 'get'
})

// 实际请求地址为 ${config.api}/passport/login?token=123
sdk.request({
    uri: '/passport/login',
    type: 'post',
    data:{
        username: 'root',
        password: '123'
    }
})

```

--

### request 简单写法

- 支持 get, post, put, delete

- 上述request可以简写为

```js

sdk.get('/sso/verify?token=123')

sdk.post('/passport/login',
    {
        username: 'root',
        password: '123'
    }
)

```

---

## uri 绑定

```js

sdk.bind('sso')
    .bind('passport')

sdk.sso.get('/verify?token=123')

sdk.passport.post('/login',
    {
        username: 'root',
        password: '123'
    }
)

```

---

## 事件支持

```js

sdk.on('test', function(event){console.log(event)}) // 监听事件
sdk.once('test', function(event){console.log(event)}) // 只监听一次
sdk.emit('test', 1234) // 产生事件
sdk.off('test') // 停止监听

// uri 绑定后也支持事件
sdk.sso.on('test')
sdk.sso.emit('test')

```

---

## log

config.logLevel: error, warn, info, debug

```
sdk.logger.logLevel = config.logLevel

sdk.logger.debug('日志')
```

---

## login

```
sdk.login = async function () {
  let doc = await this.passport.login('root', '123')
  return doc
}
```

--

### checkLogin

```
await sdk.checkLogin()
```

--

### logout

```
sdk.logout()
```
