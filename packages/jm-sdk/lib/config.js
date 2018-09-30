const error = require('jm-err')
const {Err} = error
const name = 'config'

module.exports = function (opts) {
  let app = this
  this.bind(name)
  const $ = app[name]

  /**
   * 获取配置
   * @param root 根(必填)
   * @param key 配置项(必填)
   * @returns {Promise<*>}
   */
  $.getConfig = async function (root, key) {
    if (!root || !key) throw error.err(Err.FA_PARAMS)
    return this.get(`/${root}/${key}`)
  }

  /**
   * 设置配置信息
   * @param root 根(必填)
   * @param key 配置项(必填)
   * @param value 配置值(可选)
   * @param expire 过期时间(可选, 单位秒, 默认0代表永不过期)
   * @returns {Promise<void>}
   */
  $.setConfig = async function (root, key, value, expire = 0) {
    if (!root || !key) throw error.err(Err.FA_PARAMS)
    return this.post(`/${root}/${key}`, {value, expire})
  }

  /**
   * 删除配置信息
   * @param root 根(必填)
   * @param key 配置项(必填)
   * @returns {Promise<*>}
   */
  $.removeConfig = async function (root, key) {
    if (!root || !key) throw error.err(Err.FA_PARAMS)
    return this.delete(`/${root}/${key}`)
  }

  /**
   * 删除根配置, 所有根下面的配置信息都被删除
   * @param root 根(必填)
   * @returns {Promise<*>}
   */
  $.removeRoot = async function (root) {
    if (!root) throw error.err(Err.FA_PARAMS)
    return this.delete(`/${root}`)
  }

  /**
   * 列出配置项, 返回{rows:[]}
   * @param root 根(必填)
   * @returns {Promise<*>}
   */
  $.getKeys = async function (root) {
    if (!root) throw error.err(Err.FA_PARAMS)
    return this.get(`/${root}`)
  }

  /**
   * 列出配置项及值
   * @param root 根(必填)
   * @returns {Promise<*>}
   */
  $.getConfigs = async function (root) {
    if (!root) throw error.err(Err.FA_PARAMS)
    return this.get(`/${root}?all=1`)
  }

  /**
   * 设置多个配置信息
   * @param root 根(必填)
   * @param opts
   * @returns {Promise<*>}
   */
  $.setConfigs = async function (root, opts = {}) {
    if (!root) throw error.err(Err.FA_PARAMS)
    return this.post(`/${root}`, {value: opts})
  }

  return {
    name,
    unuse: () => {
      delete app[name]
    }
  }
}
