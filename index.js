'use strict';
const fetch = require('node-fetch');

const normalizeUrl = function (url) {
  url = url.indexOf('://') === -1 ? 'http://' + url : url
  url = url.replace(/\/$/, '')
  if (!/:\d+/.test(url)) url += ':2379'
  return url
}
const b64 = (str) => {
  let b64str = new Buffer(str).toString('base64');
  return b64str;
}

class Client {
  constructor(host, options){
    this._host = normalizeUrl(host || '127.0.0.1');
  }
  /**
   * Range
   * @param key
   * @param option{limit, revision, sort_order, sort_target, serializable, keys_only, count_only, raw}
   */
  Range(key, opt){
    if(!key) return Promise.reject('Missing Key');
    if(!opt) opt = {};
    let raw = opt.raw || false;
    let basicOption = {
      key: b64(key),
      limit: opt.limit || 0,
      revision: opt.revision || 0,
      serializable: opt.serializable || false,
      keys_only: opt.keys_only || false,
      count_only: opt.count_only || false
    }
    return this._Request('range', 'POST', JSON.stringify(basicOption))
    .then((data) => {
      if((data.kvs || data.kvs.length > 0) && !raw){
        data.kvs = data.kvs.map((e) => {
          e.key = new Buffer(e.key, 'base64').toString();
          e.value = new Buffer(e.value, 'base64').toString();
          return e;
        })
      }
      return Promise.resolve(data);
    });
  }
  /**
   * Put
   * @param key
   * @param value
   * @param option {lease, prev_kv}
   */
  Put(key, value, opt){
    if(!key || !value) return Promise.reject('Missing Key/Value');
    if(!opt) opt = {};
    let option = {
      key: b64(key),
      value: b64(value),
      lease: opt.lease || 0,
      prev_kv: opt.prev_kv || false 
    }
    return this._Request('put', 'POST', JSON.stringify(option));
  }
  /**
   * DeleteRange
   */
  DeleteRange(){

  }
  /**
   * Txn
   */
  Txn(){

  }
  /**
   * Compact
   */
  Compact(){

  }
  /**
   * Request
   * @param Url TargetURL
   * @param method Using method
   * @param body
   */
  _Request(type, method, body){
    let url = this._host.concat(`/v3alpha/kv/${type}`) 
    return fetch(url, {method, body})
    .then((res) => {
      return res.json();
    })
  }
}

module.exports = Client